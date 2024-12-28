import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar />
            <div className='flex flex-col flex-1'>
                <Header />
                <main className='p-4 flex-1 overflow-y-auto'>
                    <Outlet />
                </main>
                <Toaster position='bottom-right' />
            </div>
        </div>
    );
};

export default Layout;
