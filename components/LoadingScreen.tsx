import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white text-center">
        <div className="loader mb-4"></div>
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
