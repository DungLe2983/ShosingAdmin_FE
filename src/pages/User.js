import React, { useEffect, useState } from "react";
import UserForm from "./Forms/UserForm";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Mock data
const mockUsers = [
  {
    id: 1,
    userName: "johndoe",
    fullName: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "0123456789",
    address: "123 Main St, City, Country",
  },
  {
    id: 2,
    userName: "janedoe",
    fullName: "Jane Doe",
    email: "janedoe@example.com",
    phoneNumber: "0987654321",
    address: "456 Elm St, City, Country",
  },
  {
    id: 3,
    userName: "bobsmith",
    fullName: "Bob Smith",
    email: "bobsmith@example.com",
    phoneNumber: "0912345678",
    address: "789 Oak St, City, Country",
  },
];

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = mockUsers;
        setUsers(data);
      } catch (error) {
        console.log("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleEditUser = (user) => {
    setEditData(user);
    setIsFormOpen(true);
  };

  const confirmDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleSubmitUser = (userData) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editData.id ? { ...editData, ...userData } : user
        )
      );
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setIsFormOpen(false);
    }
  };

  const handleDeleteUser = (id) => {
    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>Users</h2>
      <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
          <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
          />
        </div>
      </div>

      <div className='overflow-x-auto mt-6'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200'>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Username
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Full Name
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Email
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Phone
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Address
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className='border-b hover:bg-gray-100 transition-colors'
              >
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {user.userName}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {user.fullName}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {user.email}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {user.phoneNumber}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {user.address}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700 space-x-2'>
                  <button
                    onClick={() => handleEditUser(user)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    <i className='ri-edit-line'></i>
                  </button>
                  <button
                    onClick={() => confirmDeleteUser(user)}
                    className='text-red-600 hover:text-red-800'
                  >
                    <i className='ri-delete-bin-line'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <UserForm
          closeForm={() => setIsFormOpen(false)}
          onSubmit={handleSubmitUser}
          initialData={editData}
        />
      )}
      {deleteModalOpen && selectedUser && (
        <DeleteButton
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeleteUser(selectedUser.id)}
          itemName={selectedUser.userName}
        />
      )}
    </div>
  );
};

export default User;
