import React from "react";

const ToggleChartsButton = ({ onClick }) => {
  return (
    <button style={buttonStyle} onClick={onClick}>
      Toggle Charts
    </button>
  );
};

const buttonStyle = {
  position: "fixed",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  outline: "none",
  transition: "background-color 0.3s, transform 0.2s",
};

export default ToggleChartsButton;
