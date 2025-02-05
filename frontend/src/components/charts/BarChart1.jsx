import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          padding: '10px',
          color: '#767B8B',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
        }}
      >
        <p className="label">{`Name: ${payload[0].payload.name}`}</p>
        <p className="intro">{`Total Queries: ${payload[0].payload.total_queries}`}</p>
      </div>
    );
  }

  return null;

};



const LineChart1 = ({ companies }) => {
  const [barChartData, setBarChartData] = useState([]);
 

  useEffect(() => {
    if (companies && companies.length > 0) {
      const updatedCompanies = companies.map((company) => {
        const totalQueries = parseFloat(company.total_queries);
        const barchartobj = {
          name: company.company_name,
          total_queries:
            !isNaN(totalQueries) && totalQueries > 0 ? totalQueries : 0,
        };
        return barchartobj;
      });

      setBarChartData(updatedCompanies);
    }
  }, [companies]);



  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={barChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Line
          type="monotone"
          dataKey="total_queries"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChart1;
