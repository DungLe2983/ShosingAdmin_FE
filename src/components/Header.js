import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  // <header className='bg-white shadow px-4 py-3 flex items-center justify-between'>
  //     <h1 className='text-lg font-semibold'>Dashboard</h1>
  //     <div className='flex items-center space-x-4'>
  //         <i className='ri-notification-3-line text-xl'></i>
  //         <i className='ri-user-line text-xl'></i>
  //     </div>
  // </header>
  <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200'>
    <p className='text-heading3-bold'> ADMIN PANEL</p>
    <Link to={"/profile"} className='hover:scale-105 cursor-pointer'>
      <i className='ri-account-circle-fill text-[32px] pr-10 '></i>
    </Link>
  </div>
);

export default Header;
