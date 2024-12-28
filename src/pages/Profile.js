import React, { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  getAddresses,
} from "../services/profileService";
import toast from "react-hot-toast";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    district: "",
    city: "",
  }); // Thêm địa chỉ mới dạng đối tượng
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileAndAddresses = async () => {
      try {
        setLoading(true);

        // Fetch user profile
        const data = await getProfile(token);
        setProfile(data.user);

        // Fetch addresses
        const addressData = await getAddresses(token);
        setAddresses(addressData.addresses); // Store the addresses in state
      } catch (error) {
        toast.error("Không thể lấy thông tin người dùng hoặc địa chỉ");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndAddresses();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedProfile = await updateProfile(profile, token);
      setProfile(updatedProfile);
      toast.success("Cập nhật thông tin thành công");
      setIsEditing(false);
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = () => {
    if (newAddress.street.trim()) {
      setAddresses((prevAddresses) => [
        ...prevAddresses,
        { ...newAddress }, // Thêm đối tượng địa chỉ vào mảng
      ]);
      setNewAddress({ street: "", district: "", city: "" }); // Clear the input fields
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center'>
      <div className='w-full max-w-3xl bg-white shadow-lg p-6 mt-6 rounded-lg'>
        <h2 className='text-heading3-bold mb-4'>Thông Tin Người Dùng</h2>
        {loading ? (
          <p className='text-center text-gray-500'>Đang tải...</p>
        ) : (
          <form onSubmit={handleUpdate} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Họ và Tên:
              </label>
              <input
                type='text'
                name='name'
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email:
              </label>
              <input
                type='email'
                name='email'
                value={profile.email}
                disabled
                className='w-full px-3 py-2 mt-1 border rounded-md bg-gray-100'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Số Điện Thoại:
              </label>
              <input
                type='text'
                name='phone'
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
              />
            </div>
            <div>
              <div className='space-y-2'>
                {isEditing && (
                  <button
                    type='button'
                    onClick={handleAddAddress}
                    className='mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                  >
                    Thêm Địa Chỉ
                  </button>
                )}
              </div>
              <div className='mt-4'>
                <h3 className='text-sm font-medium text-gray-700'>
                  Các Địa Chỉ:
                </h3>
                <ul>
                  {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <li key={index} className='text-sm text-gray-500'>
                        {address.street}, {address.district}, {address.city}
                      </li>
                    ))
                  ) : (
                    <p className='text-sm text-gray-500'>Chưa có địa chỉ nào</p>
                  )}
                </ul>
              </div>
            </div>
            <div className='flex justify-end space-x-4'>
              {isEditing ? (
                <>
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
                  >
                    Hủy
                  </button>
                  <button
                    type='submit'
                    disabled={loading}
                    className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                  >
                    {loading ? "Đang cập nhật..." : "Lưu"}
                  </button>
                </>
              ) : (
                <button
                  type='button'
                  onClick={() => setIsEditing(true)}
                  className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                >
                  Chỉnh Sửa
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
