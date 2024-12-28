import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteButton from "../components/DeleteButton.js";
import { getAllProducts, deleteProduct } from "../services/productService";
import AddProduct from "./Forms/AddProduct.js";
import EditProduct from "./Forms/EditProduct.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getAllProducts();
        if (productData && Array.isArray(productData.products)) {
          setProducts(productData.products);
        } else {
          toast.error("Invalid product data format.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products.");
      }
    };

    fetchData();
  }, []);

  const handleCreateProduct = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const reloadProducts = (newProduct) => {
    setProducts((prev) =>
      newProduct.id
        ? prev.map((p) => (p.id === newProduct.id ? newProduct : p))
        : [...prev, newProduct]
    );
  };

  const handleEditProduct = (product) => {
    setEditData(product);
    setIsFormOpen(true);
  };

  const confirmDeleteProduct = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteProduct = async (_id) => {
    try {
      const id = selectedProduct._id;
      console.log("ID==", id);
      await deleteProduct(id, token);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product deleted successfully");
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>List of Products</h2>
      <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
        <button
          onClick={handleCreateProduct}
          className='bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          Create Product
        </button>
      </div>

      <div className='mt-6 overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200'>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Name
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Categories
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Description
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Price
              </th>

              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) &&
              products.map((product) => (
                <tr key={product._id} className='border-b hover:bg-gray-50'>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {product.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {product.category ? product.category.name : "N/A"}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {product.description}
                  </td>
                  <td className='px-4 py-3 text-sm text-red-500 font-semibold'>
                    {product.basePrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>

                  <td className='py-3 px-4 space-x-4'>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className='text-blue-600 hover:text-blue-800 text-[18px]'
                    >
                      <i className='ri-edit-line'></i>
                    </button>
                    <button
                      onClick={() => confirmDeleteProduct(product)}
                      className='text-red-600 hover:text-red-800 text-[18px]'
                    >
                      <i className='ri-delete-bin-line'></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* {isFormOpen && (
        <AddProduct
          closeForm={() => setIsFormOpen(false)}
          token={token}
          reload={reloadProducts}
          // categories={categories}
        />
      )} */}

      {isFormOpen &&
        // Tùy thuộc vào điều kiện mở form, hiển thị AddProduct hoặc EditProduct
        (editData ? (
          <EditProduct
            closeForm={() => setIsFormOpen(false)} // Đóng form chỉnh sửa
            token={token}
            reload={reloadProducts}
            editData={editData} // Truyền dữ liệu sản phẩm cần chỉnh sửa vào EditProduct
          />
        ) : (
          <AddProduct
            closeForm={() => setIsFormOpen(false)} // Đóng form tạo sản phẩm
            token={token}
            reload={reloadProducts}
          />
        ))}

      {deleteModalOpen && selectedProduct && (
        <DeleteButton
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeleteProduct(selectedProduct._id)}
          itemName={selectedProduct.name}
        />
      )}
    </div>
  );
};

export default Products;
