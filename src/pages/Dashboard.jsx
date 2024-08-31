import React, { useState } from "react";
import { Button } from "antd";
import TableView from "./TableView";
import PieChartView from "./PieChartView";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("table");

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="p-4 md:p-5">
      {/* Button Group for View Switching */}
      <div className="flex justify-center mb-4 gap-2 md:gap-4">
        <Button
          type={activeView === "table" ? "primary" : "default"}
          onClick={() => handleViewChange("table")}
          className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base"
        >
          Table View
        </Button>
        <Button
          type={activeView === "chart" ? "primary" : "default"}
          onClick={() => handleViewChange("chart")}
          className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base"
        >
          Pie Chart View
        </Button>
      </div>

      {/* Content Area */}
      <div className="w-full flex justify-center overflow-hidden">
        {activeView === "table" ? (
          <div className="w-full overflow-x-auto">
            <TableView />
          </div>
        ) : (
          <PieChartView />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
