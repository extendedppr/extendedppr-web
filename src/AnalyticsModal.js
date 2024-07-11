import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

import AvgChart from "./AvgChart";
import EircodePriceChart from "./EircodePriceChart";
import EircodeUndervaluedChart from "./EircodeUndervaluedChart";

const api_domain = "https://e4expolexk.execute-api.eu-west-1.amazonaws.com";

class AnalyticsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avgData: [],
      undervaluedByEircode: [],
      eircodePriceData: [],
    };

    this.fetchPropertyData = this.fetchPropertyData.bind(this);
  }

  componentDidMount() {
    this.fetchPropertyData();
  }

  fetchPropertyData() {
    let queryParamsObj = {
      filterCounties: this.props.counties,
      filterPropertyTypes: this.props.property_types,
      filterAgents: this.props.agents,

      minDate: this.props.startYear,
      maxDate: this.props.endYear,

      minBeds: this.props.minBeds,
      maxBeds: this.props.maxBeds,

      minPrice: this.props.minPrice,
      maxPrice: this.props.maxPrice,

      dataOption: this.props.dataOption,
    };

    const queryParams = new URLSearchParams(queryParamsObj).toString();

    if (this.props.dataOption === "matchedWithPPR") {
      fetch(`${api_domain}/api/chart/undervalued_by_eircode?${queryParams}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.setState({
            undervaluedByEircode: data,
          });
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }

    fetch(`${api_domain}/api/chart/avgprices?${queryParams}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          avgData: data,
        });
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    fetch(`${api_domain}/api/chart/avgpricesbyeircode?${queryParams}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          eircodePriceData: data,
        });
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }

  render() {
    const { avgData, undervaluedByEircode, eircodePriceData } = this.state;

    return (
      <div className="modal">
        <h2>Analytics Charts</h2>

        <p>
          Note that the view of the map does not impact the data in the graphs.
          If beds / agents / property types is not default, then only ppr
          properties with matching listings fitting those filters will be
          included
        </p>
        <p>
          Also, the PPR is riddled with issues which may impact the results. I
          have attempted to get rid of as many obvious errors as possible but
          there is more work to be done
        </p>
        <button onClick={this.fetchPropertyData}>Update Charts</button>

        <div>
          <p style={{ color: "white" }}>
            Note that all filters apply to graphs, the view of the map has no
            impact. Also, there is no random sample as that is just to be
            friendly to the browser.
          </p>
          <AvgChart data={avgData} />
          {this.props.dataOption == "matchedWithPPR" && (
            <EircodeUndervaluedChart data={undervaluedByEircode} />
          )}
          <EircodePriceChart data={eircodePriceData} />
        </div>
      </div>
    );
  }
}

export default AnalyticsModal;
