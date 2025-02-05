import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ClientLineChart = () => {
  const [chatbots, setChatBots] = useState([]);
  const token = localStorage.getItem('token');
  const company = JSON.parse(localStorage.getItem('company'))

  useEffect(() => {
    async function getCompanyChatBots() {
      try {
        const res = await axios.get(
          `https://chatbot.teamjft.com/admin/companies/${company?.id}/chatbots`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const chatbots = await res.data.data;
        setChatBots(chatbots);
      } catch (err) {
        console.log(err);
      }
    }
    getCompanyChatBots();
  }, []);

  // Transform chatbots data for the chart
  const chartData = chatbots.map((chatbot) => ({
    name: chatbot.chatbot_name, // Name of the chatbot
    total_queries: chatbot.total_queries, // Total queries of the chatbot
  }));

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'white',
        marginTop: '2rem',
        padding: '1rem',
        height: '20rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData} // Use the transformed data here
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name" // X-Axis shows chatbot names
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total_queries" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientLineChart;
