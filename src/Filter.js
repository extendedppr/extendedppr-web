import React, { useState } from "react";
import Select from "react-select";
import Tooltip from "rc-tooltip";

import "rc-tooltip/assets/bootstrap.css";

export default (props) => {
  const {
    counties,
    selectedCounties,
    selectedAgents,
    selectedPropertyTypes,
    updateCounties,
    updatePropertyTypes,
    updateAgents,
    property_types,
    agents,
    startYear,
    endYear,
    handleStartChange,
    handleEndChange,
    showModal,
    minBeds,
    maxBeds,
    minPrice,
    maxPrice,
    handleMinBeds,
    handleMaxBeds,
    handleMinPrice,
    handleMaxPrice,
    dataOption,
    handleDataOptionChange,
  } = props;

  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  const selectContainerStyle = {
    maxWidth: "250px",
    marginBottom: "10px",
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      ...commonStyles,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#ccc",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "#333",
      color: "white",
      ":hover": {
        backgroundColor: "#555",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "white",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  const filterBarStyle = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#333",
    color: "white",
    padding: "10px 0",
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 1000,
  };

  const yearContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "10px",
  };

  const yearInputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: "20px",
  };

  const toggleButtonStyle = {
    position: "absolute",
    top: "-20px",
    left: "20px",
    transform: "translateX(-50%)",
    cursor: "pointer",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    zIndex: 1001,
  };

  const commonStyles = {
    backgroundColor: "#333",
    color: "white",
    borderColor: "grey",
  };

  return (
    <div className={`${showModal ? "hidden" : ""}`} style={filterBarStyle}>
      <Tooltip placement="right" overlay={"Minimize / maximize filters"}>
        <button style={toggleButtonStyle} onClick={toggleMinimize}>
          {isMinimized ? "+" : "-"}
        </button>
      </Tooltip>

      {!isMinimized && (
        <>
          <div
            className={`${showModal ? "hidden" : ""}`}
            style={filterBarStyle}
          >
            <div style={selectContainerStyle}>
              <span>Counties: </span>
              <Select
                menuPlacement="top"
                styles={selectStyles}
                options={counties}
                isMulti
                defaultValue={selectedCounties}
                onChange={(e) => updateCounties(e)}
              />
            </div>

            <div style={selectContainerStyle}>
              <span>Property Type: </span>
              <Select
                menuPlacement="top"
                styles={selectStyles}
                options={property_types}
                isMulti
                defaultValue={selectedPropertyTypes}
                onChange={(e) => updatePropertyTypes(e)}
              />
            </div>

            <div style={selectContainerStyle}>
              <span>Agent: </span>
              <Select
                menuPlacement="top"
                styles={selectStyles}
                options={agents}
                isMulti
                defaultValue={selectedAgents}
                onChange={(e) => updateAgents(e)}
              />
            </div>

            <div style={yearInputContainerStyle}>
              <div>
                <span>Start Year: </span>
                <input
                  type="number"
                  value={startYear}
                  onChange={handleStartChange}
                  style={{
                    backgroundColor: "#555",
                    color: "white",
                    borderColor: "white",
                    marginLeft: "10px",
                  }}
                />
              </div>
              <div>
                <span>End Year: </span>
                <input
                  type="number"
                  value={endYear}
                  onChange={handleEndChange}
                  style={{
                    backgroundColor: "#555",
                    color: "white",
                    borderColor: "white",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>

            <div style={yearInputContainerStyle}>
              <div>
                <span>Min Beds: </span>
                <input
                  type="number"
                  value={minBeds}
                  onChange={handleMinBeds}
                  style={{
                    backgroundColor: "#555",
                    color: "white",
                    borderColor: "white",
                    marginLeft: "10px",
                  }}
                />
              </div>
              <div>
                <span>Max Beds: </span>
                <input
                  type="number"
                  value={maxBeds}
                  onChange={handleMaxBeds}
                  style={{
                    backgroundColor: "#555",
                    color: "white",
                    borderColor: "white",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>

            <div style={yearInputContainerStyle}>
              <div>
                <span>Min Price: </span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={handleMinPrice}
                  style={{
                    backgroundColor: "#555",
                    color: "white",
                    borderColor: "white",
                    marginLeft: "10px",
                  }}
                />
              </div>
              <div>
                <span>Max Price: </span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPrice}
                  style={{
                    backgroundColor: "#555",
                    color: "white",
                    borderColor: "white",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>

            <div>
              <form>
                <div>
                  <label>
                    <Tooltip
                      placement="top"
                      overlay={"Show all PPR sales by sale price"}
                    >
                      <input
                        type="radio"
                        value="PPRPrice"
                        checked={dataOption === "PPRPrice"}
                        onChange={handleDataOptionChange}
                      />
                    </Tooltip>
                    PPR Sale Price
                  </label>
                </div>
                <div>
                  <label>
                    <Tooltip
                      placement="top"
                      overlay={
                        "Show all PPR sales, matched with their listing if available"
                      }
                    >
                      <input
                        type="radio"
                        value="matchedWithPPR"
                        checked={dataOption === "matchedWithPPR"}
                        onChange={handleDataOptionChange}
                      />
                    </Tooltip>
                    Undervalued Properties
                  </label>
                </div>
                <div>
                  <label>
                    <Tooltip
                      placement="top"
                      overlay={"Show all historical listings."}
                    >
                      <input
                        type="radio"
                        value="allHistoricalListings"
                        checked={dataOption === "allHistoricalListings"}
                        onChange={handleDataOptionChange}
                      />
                    </Tooltip>
                    Historical Listings
                  </label>
                </div>
                <div>
                  <label>
                    <Tooltip
                      placement="top"
                      overlay={"Show all shared properties"}
                    >
                      <input
                        type="radio"
                        value="shares"
                        checked={dataOption === "shares"}
                        onChange={handleDataOptionChange}
                      />
                    </Tooltip>
                    Shares
                  </label>
                </div>
                <div>
                  <label>
                    <Tooltip placement="top" overlay={"Shows all rentals"}>
                      <input
                        type="radio"
                        value="rentals"
                        checked={dataOption === "rentals"}
                        onChange={handleDataOptionChange}
                      />
                    </Tooltip>
                    Rentals
                  </label>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
