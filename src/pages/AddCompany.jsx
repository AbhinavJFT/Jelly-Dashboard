import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UploadIcon from '../assets/icons/UploadIcon';
import CloudUploadIcon from '../assets/icons/CloudUploadIcon';

const AddCompany = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const token = localStorage.getItem('token');

  const companyNameRef = useRef();
  const companyEmailRef = useRef();
  const chatbotNameRef = useRef();
  const deploymentURLRef = useRef();
  const baseURLRef = useRef();

  const handleBackClick = () => {
    navigate(-1);
  };

  const submitHandler = async () => {
    const companyName = companyNameRef.current.value;
    const companyEmail = companyEmailRef.current.value;
    const chatbotName = chatbotNameRef.current.value;
    const deploymentURL = deploymentURLRef.current.value;
    const baseURL = baseURLRef.current.value;

    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('email', companyEmail);
    formData.append('chatbot_name', chatbotName);
    formData.append('deployment_url', deploymentURL);
    formData.append('base_url', baseURL);

    selectedFiles.forEach((file) => {
      formData.append('files', file); // Append multiple files
    });

    console.log('form data is', formData);

    try {
      const res = await axios.post(
        'https://chatbot.teamjft.com/init_company',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response is', res);

      if (res.status === 200) {
        navigate('/success', { state: { path: 'dashboard' } });
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setUploadError(null);
  };

  return (
    <div className="h-auto bg-gradient-to-b from-black to-[#343368] text-white p-[2rem] relative">
      <Navbar />
      <button
        className="border h-[3rem] w-[7rem] mt-[1.2rem] hover:font-bold text-[1rem]"
        onClick={handleBackClick}
      >
        Back
      </button>
      <div className="h-auto mt-[2rem] flex gap-3 w-full">
        <Sidebar />
        <div className="w-auto mt-[2rem] p-4  w-[100%] ml-[2rem]">
          <div className="text-[#C7C7CB] font-bold text-2xl b flex items-center justify-between  ">
            ADD COMPANY
            <button
              className="font-normal text-[12px] rounded-2xl p-[7px] flex  items-center justify-between text-white border border-white cursor-pointer w-[10rem] h-[2rem] "
              onClick={() => setShowModal(true)}
            >
              <UploadIcon />
              <p className="text-[13px]">Upload Document</p>
            </button>
          </div>
          <div className="mt-[5rem] flex flex-wrap items-center justify-start w-[70rem] ">
            <div className="flex flex-col gap-2 ml-[2rem]">
              <label htmlFor="companyName" className="text-xl font-bold">
                Company Name
              </label>
              <input
                type="text"
                ref={companyNameRef}
                className="h-[2.2rem] w-[18rem] outline-none p-2 text-black"
              />
            </div>
            <div className="flex flex-col gap-2 ml-[2rem]">
              <label htmlFor="companyEmail" className="text-xl font-bold">
                Company Email
              </label>
              <input
                type="text"
                ref={companyEmailRef}
                className="h-[2.2rem] w-[18rem] outline-none p-2 text-black"
              />
            </div>
            <div className="flex flex-col gap-2 ml-[2rem]">
              <label htmlFor="chatbotName" className="text-xl font-bold">
                Chatbot Name
              </label>
              <input
                type="text"
                ref={chatbotNameRef}
                className="h-[2.2rem] w-[18rem] outline-none p-2 text-black"
              />
            </div>
            <div className="flex flex-col gap-2 ml-[2rem] mt-[3rem]">
              <label htmlFor="deploymentURL" className="text-xl font-bold">
                Deployment URL
              </label>
              <input
                type="text"
                ref={deploymentURLRef}
                className="h-[2.2rem] w-[18rem] text-black outline-none p-2"
              />
            </div>
            <div className="flex flex-col gap-2 mt-[3rem] ml-[2rem]">
              <label htmlFor="baseURL" className="text-xl font-bold">
                Base URL
              </label>
              <input
                type="text"
                ref={baseURLRef}
                className="h-[2.2rem] w-[18rem] outline-none p-2 text-black outline-none p-2"
              />
            </div>
          </div>
          <div className="mt-[6rem] flex items-center justify-center gap-5">
            <button
              className="h-[3.1rem] w-[8rem] rounded-md bg-[#6D62E5]"
              onClick={submitHandler}
            >
              ADD
            </button>
            <button className="h-[3.1rem] w-[9rem] rounded-md bg-[#B6B6B6]">
              CANCEL
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        Powered By Jellyfish Technologies  
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[30rem] h-[20rem] rounded-lg p-6 relative">
            <div className="flex items-center justify-between -translate-y-2/4 ">
              <p className="text-black font-bold text-lg">Upload Document</p>
              <button
                className="absolute top-0 -right-3 text-3xl font-bold text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-dashed h-[15rem]">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex items-center justify-center"
              >
                <CloudUploadIcon />
              </label>

              <p className="text-gray-600 mt-[1rem]">
                {selectedFiles.length > 0
                  ? selectedFiles.map((file) => file.name).join(', ')
                  : 'Drag and drop files here'}
              </p>
              <p className="text-gray-500">OR</p>
              <button
                className="mt-2 text-blue-500 underline"
                onClick={submitHandler}
              >
                Click here to upload
              </button>
              {uploadError && (
                <p className="text-red-500 mt-2">{uploadError}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCompany;
