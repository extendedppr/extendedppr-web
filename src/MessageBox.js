import React, { useState } from "react";
import "./MessageBox.css";

const MessageBox = ({ text = "Your customizable text here!" }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  return (
    <div
      className={`bottomRightBox ${isMinimized ? "minimized" : ""}`}
      onClick={toggleMinimize}
    >
      {!isMinimized && text}
    </div>
  );
};

export default MessageBox;
