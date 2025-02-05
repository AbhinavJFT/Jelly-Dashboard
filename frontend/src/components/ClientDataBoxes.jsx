import React from 'react';
import GroupIcon from '../assets/icons/GroupIcon';
import UpArrowIcon from '../assets/icons/UpArrowIcon';

const ClientDataBoxes = ({ company: dashboardData }) => {
  const roundToThreeDecimals = (num) => {
    return isNaN(num) ? 'N/A' : Math.round(num * 1000) / 1000;
  };

  return (
    <div className="h-autoAp flex flex-wrap mt-[1rem] gap-[1rem]">
      <div className="w-[20rem] h-[9rem] bg-white shadow-md flex flex-col p-5 gap-2 text-[#A5A5A5] rounded-md">
        <span className="flex items-center justify-between">
          <p>Input Tokens</p>
          <span className="p-1 bg-[#D4DAF9] rounded-full">
            <GroupIcon />
          </span>
        </span>
        <p className="text-2xl font-bold text-[#767B8B]">
          {roundToThreeDecimals(dashboardData?.input_tokens ?? 0)}
        </p>
        <span className="mt-[1rem] flex items-center justify-between">
          <p className="flex gap-1 items-center justify-center text-[#10C469]">
            <UpArrowIcon /> 0%
          </p>
          <p className="text-sm">Since last month</p>
        </span>
      </div>

      <div className="w-[20rem] h-[9rem] bg-white shadow-md flex flex-col p-5 gap-2 text-[#A5A5A5] rounded-md">
        <span className="flex items-center justify-between">
          <p>Output Tokens</p>
          <span className="p-1 bg-[#D4DAF9] rounded-full">
            <GroupIcon />
          </span>
        </span>
        <p className="text-2xl font-bold text-[#767B8B]">
          {roundToThreeDecimals(dashboardData?.output_tokens ?? 0)}
        </p>
        <span className="mt-[1rem] flex items-center justify-between">
          <p className="flex gap-1 items-center justify-center text-[#10C469]">
            <UpArrowIcon /> 0%
          </p>
          <p className="text-sm">Since last month</p>
        </span>
      </div>

      <div className="w-[20rem] h-[9rem] bg-white shadow-md flex flex-col p-5 gap-2 text-[#A5A5A5] rounded-md">
        <span className="flex items-center justify-between">
          <p>Total Queries</p>
          <span className="p-1 bg-[#D4DAF9] rounded-full">
            <GroupIcon />
          </span>
        </span>
        <p className="text-2xl font-bold text-[#767B8B]">
          {roundToThreeDecimals(dashboardData?.total_queries ?? 0)}
        </p>
        <span className="mt-[1rem] flex items-center justify-between">
          <p className="flex gap-1 items-center justify-center text-[#10C469]">
            <UpArrowIcon /> 0%
          </p>
          <p className="text-sm">Since last month</p>
        </span>
      </div>
    </div>
  );
};

export default ClientDataBoxes;
