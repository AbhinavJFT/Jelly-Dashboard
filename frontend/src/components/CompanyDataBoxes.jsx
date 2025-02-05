import React, { useEffect, useState } from 'react';
import ExpandIcon from '../assets/icons/ExpandIcon';
import GroupIcon from '../assets/icons/GroupIcon';
import UpArrowIcon from '../assets/icons/UpArrowIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyDataBoxes = ({ companies }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const roundToThreeDecimals = (num) => {
    return isNaN(num) ? 'N/A' : Math.round(num * 1000) / 1000;
  };

  return (
    <div className="flex gap-4 mt-[1rem] flex-wrap">
      {companies?.map((company) => {
        return (
          <div
            key={company.id}
            className="h-auto w-[26rem] bg-white rounded-md p-2 cursor-pointer"
            onClick={() => {
              navigate(`/company/details/${company.id}`, {
                state: { company: company },
              });
            }}
          >
            <div className="flex items-center gap-5 mt-[1rem] ">
              <div className="rounded-full bg-[#CDD3F8] p-2">
                <GroupIcon />
              </div>
              <span className="text-[#878787] text-xl font-bold">
                {company.company_name}
              </span>
            </div>
            <div className=" mt-[1.5rem] flex mb-[1rem] p-2  justify-between">
              <div className="h-[5rem] flex flex-col gap-2 w-[10rem]  ml-[1rem] ">
                <span className="text-[#908A8A] text-sm font-bold">
                  Total token cost
                </span>
                <span className="text-[#908A8A] font-bold text-xl">
                  $
                  {roundToThreeDecimals(
                    company.input_token_cost + company.output_token_cost
                  )}
                </span>
              </div>
              <div className="border border-[#C9C9C9] mr-[60px] h-[3rem] mt-[10px] "></div>
              <div className=" h-[5rem] flex flex-col gap-2 mr-[1.5rem] ">
                <span className="text-[#908A8A] text-sm font-bold">
                  Total queries
                </span>
                <span className="text-[#878787] font-bold text-xl">
                  {company.total_queries}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyDataBoxes;
