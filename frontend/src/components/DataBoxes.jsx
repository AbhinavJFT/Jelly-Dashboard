import React from 'react';

const DataBoxes = ({ dashboardData }) => {
  const roundToThreeDecimals = (num) => {
    return isNaN(num) ? 'N/A' : Math.round(num * 1000) / 1000;
  };
  return (
    <div className="h-auto flex flex-wrap mt-[1rem] gap-[1rem]">
      <div className="w-auto h-[4rem] bg-white shadow-md flex items-center  p-5 gap-2 text-[#A5A5A5] rounded-md">
        <span className="flex items-center justify-between">
          <p className="font-bold text-black">Total Tokens:</p>
        </span>
        <p className="text-2xl font-bold text-[#767B8B]">
          {roundToThreeDecimals(
            dashboardData?.input_tokens + dashboardData?.output_tokens ?? 0
          )}
        </p>
        <div className="border border-[#E0E0E0] h-[100%]"></div>
        <span className="flex items-center justify-between">
          <p className="font-bold text-black">Total Dollars Spend: </p>
        </span>
        <p className="text-2xl font-bold text-[#767B8B]">
          ${roundToThreeDecimals(dashboardData?.dollar_spend_total ?? 0)}
        </p>
      </div>      
    </div>
  );
};

export default DataBoxes;
