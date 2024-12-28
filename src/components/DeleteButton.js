import React from 'react';

const DeleteButton = ({ onClose, onConfirm, itemName }) => {
    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-80 shadow-lg'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4'>
                    Xác nhận xóa
                </h2>
                <p className='text-gray-600 mb-6'>
                    Bạn có chắc chắn muốn xóa item <strong>{itemName}</strong>{' '}
                    không?
                </p>
                <div className='flex justify-end space-x-3'>
                    <button
                        onClick={onClose}
                        className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteButton;
