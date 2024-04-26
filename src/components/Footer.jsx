import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Main footer container with background color */}
      <div className="bg-slate-800 text-white flex flex-col justify-center items-center  w-full ">
        {/* Logo section */}
        <div className="logo font-bold text-white text-2xl flex justify-center items-center mb-2">
          <span className="text-green-500">&lt;</span>
          <span>pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        
        {/* Created with section */}
        <div className="flex justify-center items-center">
          Created with 
          <img 
            className="w-7 mx-2" 
            src="icons/heart.png" 
            alt="heart icon" 
          /> 
          by Radha Jaiswal
        </div>
      </div>
    </div>
  );
};

export default Footer;
