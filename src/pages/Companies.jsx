import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CompanyDataBoxes from '../components/CompanyDataBoxes';
import axios from 'axios';

const Companies = () => {
  const token = localStorage.getItem('token');

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const res = await axios.get(
          'https://chatbot.teamjft.com/admin/companies',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.data.data;
        setCompanies(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCompanyData();
  }, []);
  return (
    <div className="h-[100vh] bg-gradient-to-b from-black to-[#343368] text-white p-[2rem] relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-[80%] mt-[2rem] flex flex-col p-4 ">
          <div className="flex items-center justify-between">
            <span className="font-bold text-3xl mt-[1rem]">
              TOTAL COMPANIES
            </span>
          </div>
          <CompanyDataBoxes companies={companies} />
        </div>
      </div>
    </div>
  );
};

export default Companies;
