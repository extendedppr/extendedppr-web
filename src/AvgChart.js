import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AvgChart = ({ data }) => (
  <div>
    <h2>Price Average</h2>
    <div style={{ display: "flex", alignItems: "center" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthStartDate" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="averagePrice"
            stroke="#8884d8"
            dot={false}
            strokeWidth={3}
          />{" "}
          {/* Increased line thickness */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="count"
            stroke="#82ca9d"
            dot={false}
            strokeWidth={3}
          />{" "}
          {/* Increased line thickness */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AvgChart;
