import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteButton from "../components/DeleteButton.js";
import { getAllProducts, deleteProduct } from "../services/productService";
import AddProduct from "./Forms/AddProduct.js";
import EditProduct from "./Forms/EditProduct.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Trạng thái để lưu danh sách sản phẩm đã lọc
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái cho ô tìm kiếm
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checked, setChecked] = useState(false);

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
          setFilteredProducts(productData.products); // Cập nhật sản phẩm đã lọc ban đầu
        } else {
          toast.error("Invalid product data format.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products.");
      }
    };

    fetchData();
  }, [checked]);

  const handleCreateProduct = () => {
    setEditData(null);
    setIsFormOpen(true);
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
      setFilteredProducts(
        filteredProducts.filter((product) => product._id !== id)
      ); // Cập nhật danh sách đã lọc
      toast.success("Product deleted successfully");
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  // Hàm xử lý thay đổi ô tìm kiếm
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Lọc sản phẩm theo tên
    if (query.trim() === "") {
      setFilteredProducts(products); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả sản phẩm
    } else {
      const filtered = products.filter(
        (product) => product.name.toLowerCase().includes(query.toLowerCase()) // Kiểm tra tên sản phẩm có chứa từ khóa tìm kiếm không
      );
      setFilteredProducts(filtered); // Cập nhật danh sách đã lọc
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>List of Products</h2>

      <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
          <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            value={searchQuery}
            onChange={handleSearchChange}
            className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
          />
        </div>
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
            {Array.isArray(filteredProducts) &&
              filteredProducts.map((product) => (
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

      {isFormOpen &&
        (editData ? (
          <EditProduct
            closeForm={() => setIsFormOpen(false)}
            token={token}
            reload={() => setChecked(!checked)}
            editData={editData}
          />
        ) : (
          <AddProduct
            closeForm={() => setIsFormOpen(false)}
            token={token}
            reload={() => setChecked(!checked)}
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
