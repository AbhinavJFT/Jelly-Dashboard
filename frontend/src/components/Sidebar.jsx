import React, { useState } from 'react';
import FormIcon from '../assets/icons/FormIcon';
import AddCompanyIcon from '../assets/icons/AddCompanyIcon';
import LogOutIcon from '../assets/icons/LogOutIcon';
import DashboardIcon from '../assets/icons/DashboardIcon';
import { useNavigate } from 'react-router-dom';
import DetailsIcon from '../assets/icons/DetailsIcon';
import CompanyDetailsIcon from '../assets/icons/CompanyDetailsIcon';
import ChatBotDetailsIcon from '../assets/icons/ChatBotDetailsIcon';

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const role = localStorage.getItem('role');
  const company = JSON.parse(localStorage.getItem('company'));

  const LogOutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleItemClick = (path, index) => {
    setSelectedItem(index);
    navigate(path);
  };

 
  return (
    <div
      className={`${
        role === 'admin' ? 'h-[23rem]' : 'h-[45rem]'
      }w-[17%] mt-[2rem] bg-white rounded-md flex flex-col`}
    >
      <div className=" flex flex-col items-center justify-center mt-[2rem]">
        <span className="text-[#3A356F] text-2xl font-bold">AKP</span>
        <p className="text-[#5F5F5F] font-bold text-lg">Amit Kumar Pandey</p>
        <hr className="mt-[1rem] w-[80%]" />
      </div>

      <ul className="h-auto p-3 mt-[1.5rem] flex flex-col gap-2 ">
        <li
          className={`flex items-center gap-3 p-2 cursor-pointer text-[1.1rem] ${
            selectedItem === 0
              ? 'bg-[#6D62E5] text-white'
              : 'text-[#767B8B] hover:bg-[#6D62E5] hover:text-white'
          }`}
          onClick={() => handleItemClick('/admin/dashboard', 0)}
        >
          <DashboardIcon />
          <p>Dashboard</p>
        </li>
        {role === 'admin' && (
          <li
            className={`flex items-center gap-3 p-2  cursor-pointer text-[1.1rem] ${
              selectedItem === 2
                ? 'bg-[#6D62E5] text-white'
                : 'text-[#767B8B] hover:bg-[#6D62E5] hover:text-white'
            }`}
            onClick={() => handleItemClick('/companies', 2)}
          >
            <CompanyDetailsIcon />
            <p>Companies</p>
          </li>
        )}
        {role === 'admin' && (
          <li
            className={`flex items-center gap-3 p-2  cursor-pointer text-[1.1rem] ${
              selectedItem === 3
                ? 'bg-[#6D62E5] text-white'
                : 'text-[#767B8B] hover:bg-[#6D62E5] hover:text-white'
            }`}
            onClick={() => handleItemClick('/add/company', 3)}
          >
            <AddCompanyIcon />
            <p>Add Company</p>
          </li>
        )}
        {role === 'admin' && (
          <li
            className={`flex items-center gap-3 p-2  cursor-pointer text-[1.1rem] ${
              selectedItem === 4
                ? 'bg-[#6D62E5] text-white'
                : 'text-[#767B8B] hover:bg-[#6D62E5] hover:text-white'
            }`}
            onClick={() => handleItemClick('/add/admin', 4)}
          >
            <AddCompanyIcon />
            <p>Add Admin</p>
          </li>
        )}
        {role === 'client' && (
          <li
            className={`flex items-center gap-3 p-2 cursor-pointer text-[1.1rem] ${
              selectedItem === 4
                ? 'bg-[#6D62E5] text-white'
                : 'text-[#767B8B] hover:bg-[#6D62E5] hover:text-white'
            }`}
            onClick={() =>
              navigate(`/company/details/${company.id}`, {
                state: { company: company },
              })
            }
          >
            <ChatBotDetailsIcon />
            <p>Chatbot Details</p>
          </li>
        )}
      </ul>
      <div
        className={`text-[#767B8B] mt-[22rem] flex items-center justify-center gap-2 mr-[12rem]  ${
          role === 'client'
            ? 'ml-[1rem]  translate-y-[3rem]'
            : 'mb-[1rem] ml-[1rem] '
        }`}
      >
        <LogOutIcon />
        <button onClick={LogOutHandler} className="font-bold">
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
