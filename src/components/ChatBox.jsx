import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatBox = ({ chatMessages }) => {
  return (
    <div className="h-[35rem] w-[30%] rounded-xl bg-[#EDEDED]">
      <div className="h-[5.5rem] rounded-t-xl bg-gradient-to-r from-[#6158CD] to-[#5048A7] p-4 flex justify-between">
        <div className="flex flex-col">
          <p className="text-lg">Chat With</p>
          <span className="text-xl font-bold">Jelly</span>
        </div>
      </div>
      <div className="mt-[10px] flex items-center justify-center">
        <span className=" bg-[#D9D9D9] w-[7rem] h-[2rem] flex items-center justify-center text-[#838383] text-lg">
          Today
        </span>
      </div>
      <div className="p-4 h-[26rem] rounded-b-xl overflow-y-scroll mt-[1rem]">
        <div className="flex justify-start mt-[1rem]">
          <div className="bg-white text-gray-700 p-3 rounded-t-lg rounded-br-lg shadow-sm max-w-xs w-full break-words">
            <ReactMarkdown>
              Welcome! I'm Jelly, How can I assist you today?
            </ReactMarkdown>
          </div>
        </div>

        {chatMessages.map((chat, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-end mt-[1em]">
              <div className="bg-gradient-to-b from-[#6158CD] to-[#5048A7] text-white p-3 rounded-lg shadow-sm max-w-xs w-full break-words">
                <ReactMarkdown>{chat.query_text_user}</ReactMarkdown>
              </div>
            </div>
            <div className="flex justify-start mt-[1rem]">
              <div className="bg-white text-gray-700 p-3 rounded-t-lg rounded-br-lg shadow-sm max-w-xs w-full break-words">
                <ReactMarkdown>{chat.query_text_bot}</ReactMarkdown>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
