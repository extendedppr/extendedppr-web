import React, { useState } from "react";

const EircodePriceChart = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginationStyle = {
    display: "flex",
    listStyle: "none",
    padding: "10px",
  };

  const buttonStyle = {
    margin: "0 2px",
    border: "1px solid #ddd",
    background: "#f4f4f4",
    borderRadius: "5px",
    padding: "5px 5px",
    cursor: "pointer",
  };

  const selectedButtonStyle = {
    ...buttonStyle,
    background: "#007bff",
    color: "#fff",
    border: "1px solid #007bff",
  };

  return (
    <div>
      <h2>Eircode Price Average</h2>
      This is the average sale price.
      <table>
        <thead>
          <tr>
            <th>Routing Key</th>
            <th>Average Price</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row) => (
            <tr key={row._id}>
              <td>{row._id}</td>
              <td>{row.averagePrice.toFixed(2)}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul style={paginationStyle}>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                style={
                  currentPage === number ? selectedButtonStyle : buttonStyle
                }
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default EircodePriceChart;
