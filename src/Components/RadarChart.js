import "chart.js/auto";
import React, { useEffect, useState, useRef } from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = ({ data }) => {
  const [chartId, setChartId] = useState(0);
  const chartRef = useRef(null);

  const options = {
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
      setChartId(Math.random());
    }
  }, [chartId]);

  return (
    <Radar
      data={data}
      options={options}
      ref={chartRef}
      style={{ width: "300px" }}
    />
  );
};

export default RadarChart;
