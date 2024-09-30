import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "../Animation/SplitText";
import AntdCard from "./AntdCard";
import { useSelector } from "react-redux";
import axios from "axios";
import * as d3 from "d3";
import { AdminDashboardbar } from "./AdminDashboardbar";

const AdminDashboard = () => {
  const userData = useSelector((e) => e.userData);
  const [products, setProducts] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://billing-software-backend-api.onrender.com/masterproduct");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching the product data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const svg = d3.select(svgRef.current);
      const width = 200; // Reduced width
      const height = 200; // Reduced height
      const radius = Math.min(width, height) / 2;

      svg.attr("width", width)
         .attr("height", height)
         .selectAll("*").remove(); // Clear previous chart

      const g = svg.append("g")
                   .attr("transform", `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie()
        .value(d => d.Unit_Price);

      const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      const arcs = g.selectAll(".arc")
        .data(pie(products))
        .enter().append("g")
        .attr("class", "arc");

      arcs.append("path")
        .attr("d", arc)
        .style("fill", d => color(d.data.ProductID));

      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("font-size", "10px") // Reduced font size
        .text(d => d.data.ProductID);
    }
  }, [products]);

  return (
    <div>
      <h1>
        <SplitText
          text={"Hello, " + userData.username}
          className="custom-class"
          delay={50}
        />
      </h1>
      <AntdCard />
      <svg ref={svgRef}></svg>
      <AdminDashboardbar />
    </div>
  );
};

export default AdminDashboard;
