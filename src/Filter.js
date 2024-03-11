import React, { useState } from "react";
import Select from "react-select";
import Tooltip from "rc-tooltip";

import "rc-tooltip/assets/bootstrap.css";

export default (props) => {
  const {
    counties,
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
    handleMinBeds,
    handleMaxBeds,
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
                defaultValue={[counties[0]]}
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
                defaultValue={[property_types[0]]}
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
                defaultValue={[agents[0]]}
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

            <div>
              <form>
                <div>
                  <Tooltip
                    placement="top"
                    overlay={
                      "This will show all PPR sales, matched with their listing if available."
                    }
                  >
                    <label>
                      <input
                        type="radio"
                        value="matchedWithPPR"
                        checked={dataOption === "matchedWithPPR"}
                        onChange={handleDataOptionChange}
                      />
                      Matched with PPR
                    </label>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip
                    placement="top"
                    overlay={
                      "This will show all listings and their prices from green (less expensive) to red (more expensive)."
                    }
                  >
                    <label>
                      <input
                        type="radio"
                        value="allHistoricalListings"
                        checked={dataOption === "allHistoricalListings"}
                        onChange={handleDataOptionChange}
                      />
                      Historical Listings
                    </label>
                  </Tooltip>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
