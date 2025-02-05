import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const company = location.state.company;
  const chatbot = location.state.chatbot;
  const chatMessages = location.state.chatMessages || [];
  const token = localStorage.getItem('token');

  const sessionId = chatMessages[0]?.session_id;
  const [selectedQueryData, setSelectedQueryData] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://chatbot.teamjft.com/admin/chatbots/${chatbot.chatbot_id}/query-users`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;

        if (data.length > 0) {
          const selectedData = data.filter(
            (item) => item.session_id === sessionId
          );
          const ip = selectedData[0].ip_address;

          setSelectedQueryData(selectedData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };



  return (
    <div className="h-[100vh] bg-gradient-to-b from-black to-[#343368] text-white p-[2rem] relative">
      <Navbar />
      <button
        className="border h-[3rem] w-[7rem] mt-[1.2rem] hover:font-bold text-[1rem]"
        onClick={handleBackClick}
      >
        Back
      </button>

      <div
        className={`mt-[2rem] h-[40rem] bg-white rounded-md flex p-4 ${
          isModalOpen ? 'opacity-50' : ''
        }`}
      >
        <ChatBox chatMessages={chatMessages} />
        <div className="border border-[#EDEDED] ml-[5rem] h-[80%] mt-[3rem]"></div>
        <div className="ml-[20rem] w-[40rem] flex flex-col justify-start gap-4">
          <h2 className="font-bold text-[#6D62E5] text-2xl mt-[1rem]">
            Related Info:
          </h2>
          <div className="h-auto flex flex-col text-black bg-[#F3F6FD] gap-5 p-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl">Company:</span>
              <span className="text-xl text-[#5F6064]">
                {company.company_name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl">Company Email:</span>
              <span className="text-xl text-[#5F6064]">{company.base_url}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl">Chatbot Name:</span>
              <span className="text-xl text-[#5F6064]">
                {chatbot.chatbot_name}
              </span>
            </div>
            <p
              className="underline text-[#59ABD8] cursor-pointer"
              onClick={toggleModal}
            >
              Chat Details
            </p>
          </div>

          <h2 className="font-bold text-[#6D62E5] text-2xl mt-[1rem]">
            Extracted Info:
          </h2>
          <div className="h-auto flex flex-col text-black bg-[#F3F6FD] gap-5 p-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl">Email:</span>
              <span className="text-xl text-[#5F6064]">
                {selectedQueryData && selectedQueryData[0]?.email}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-xl">Phone Number:</span>
              <span className="text-xl text-[#5F6064]">
                {selectedQueryData && selectedQueryData[0]?.phone_number?selectedQueryData[0].phone_number:'NULL'}
              </span>
            </div>
            <p
              className="underline text-[#59ABD8] cursor-pointer"
              onClick={toggleModal}
            ></p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleModal}
        >
          <div className="bg-white p-6 rounded-lg w-[35rem] h-auto flex items-center flex-col ">
            <div className="flex gap-[4rem] flex-wrap">
              <div className="flex flex-col items-start justify-center">
                <p className="text-[#7369E6] text-lg font-bold">Session Id:</p>
                <p className="text-[#8A8A8A]">{sessionId}</p>
              </div>
              <div className="flex flex-col items-start justify-center">
                <p className="text-[#7369E6] text-lg font-bold">
                  Number Of Queries:
                </p>
                <p className="text-[#8A8A8A]">{chatMessages.length}</p>
              </div>

              <div className="flex flex-col items-start justify-center">
                <p className="text-[#7369E6] text-lg font-bold">Origin URL:</p>
                <p className="text-[#8A8A8A]">
                  {selectedQueryData[0].origin_url}
                </p>
              </div>
            </div>

            <div className="border border-[#DADADA] w-full mt-[2rem]"></div>
            <div className="mt-[2rem]  flex items-center justify-between w-full">
              <p className="text-[#7369E6] text-lg font-bold">
                All Information:{' '}
              </p>
              <div className="flex flex-col items-start justify-center">
                <p className="text-[#8A8A8A] font-bold text-xl">
                  {chatbot.total_input_tokens}
                </p>
                <p className="text-[#C0C0C0]">Input Tokens</p>
              </div>
              <div className="flex flex-col items-start justify-center">
                <p className="text-[#8A8A8A] font-bold text-xl">
                  {chatbot.total_output_tokens}
                </p>
                <p className="text-[#C0C0C0]">Output Tokens</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
