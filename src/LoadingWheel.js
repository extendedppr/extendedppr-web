import React from "react";
import "./LoadingWheel.css";

const LoadingWheel = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="loading-wheel-container">
      <div className="loading-wheel"></div>
    </div>
  );
};

export default LoadingWheel;
