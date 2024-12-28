import React from 'react';

const DataCard = ({ title, number, icon }) => {
    return (
        <div className='bg-white shadow-sm rounded-lg p-4 flex items-center justify-between border border-gray-200'>
            <div>
                <p className='text-gray-600'>{title}</p>
                <p className='text-2xl font-bold mt-4'>{number}</p>
            </div>
            <div className='text-3xl text-gray-500'>
                <i className={icon}></i>
            </div>
        </div>
    );
};

export default DataCard;
