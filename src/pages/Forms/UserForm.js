import React, { useState, useEffect } from "react";

const UserForm = ({ closeForm, onSubmit, initialData = null }) => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState(""); 
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (initialData) {
      setUserName(initialData.userName || "");
      setFullName(initialData.fullName || "");
      setAddress(initialData.address || "");
      setPhoneNumber(initialData.phoneNumber || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userName,
      oldPassword,
      newPassword,
      fullName,
      address,
      phoneNumber,
    };
    onSubmit(formData);
    closeForm();
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative'>
        <h2 className='text-heading4-bold mb-8 text-center text-primary'>
          {initialData ? "Edit User" : "Create User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Old Password
            </label>
            <input
              type='text'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              New Password
            </label>
            <input
              type='text'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Address
            </label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <input
              type='text'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={closeForm}
              className='px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
