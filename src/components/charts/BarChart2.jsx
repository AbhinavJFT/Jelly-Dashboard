import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const data = [];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const BarChart2 = ({ companies }) => {
  const [barChartData, setBarChartData] = useState(data);

  useEffect(() => {
    async function getBarChartData() {
      if (companies.length > 0) {
        const updatedCompanies = companies.map((company) => {
          const cost = (
            company.input_token_cost + company.output_token_cost
          ).toFixed(3);
          const barchartobj = {
            name: company.company_name,
            cost: cost,
          };
          return barchartobj;
        });

        setBarChartData(updatedCompanies);
      }
    }
    getBarChartData();
  }, [companies]);

  return (
    <BarChart
      width={600}
      height={300}
      data={barChartData}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      style={{ cursor: 'default' }}  // Make sure cursor is not a pointer since we no longer have onClick
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar
        dataKey="cost"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: 'top' }}
      >
        {barChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarChart2;
