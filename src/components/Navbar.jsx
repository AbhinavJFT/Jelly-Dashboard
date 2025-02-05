import React from 'react';
import LogOutIcon from '../assets/icons/LogOutIcon';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const LogOutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    navigate('/');
  };

  return (
    <div className="h-[4rem] rounded-lg bg-[#6D62E5] p-5 font-bold flex items-center justify-between">
      <p>Jellyfish AI Assistant</p>
      {token && (
        <div
          className="text-white flex  gap-2 items-center justify-center hover:cursor-pointer"
          onClick={LogOutHandler}
        >
          <LogOutIcon />
          <button>LOG OUT</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
