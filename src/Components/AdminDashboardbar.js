import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export function AdminDashboardbar() {
  const [chartData, setChartData] = useState([]);
  
  // Set up options for the chart
  const options = {
    title: "Product Unit Price and Quantity",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Value",
      minValue: 0,
    },
    vAxis: {
      title: "Product",
    },
  };

  // Fetch data from the API
  useEffect(() => {
    axios.get("https://billing-software-backend-api.onrender.com/product")
      .then(response => {
        const products = response.data;
        // Format data for the chart
        const formattedData = [
          ["Product", "Unit Price", "Quantity"], // Chart header
          ...products.map(product => [
            product.product_name,
            product.unit_price,
            product.quantity
          ])
        ];
        setChartData(formattedData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {chartData.length > 0 ? (
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
}
