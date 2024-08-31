import React, { useState } from "react";
import { Button, Typography } from "antd";
import { DashboardOutlined, PieChartOutlined } from '@ant-design/icons';
import TableView from "./TableView";
import PieChartView from "./PieChartView";

const { Title } = Typography;

const Dashboard = () => {
  const [activeView, setActiveView] = useState("table");

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="p-4 md:p-5">
      <div className="mb-4 text-center">
        <Title level={2} style={{ marginBottom: '8px', fontWeight: 700, color: '#333' }}>
          <DashboardOutlined style={{ marginRight: '8px' }} />
          Security Breach Dashboard
        </Title>
        <p style={{ fontSize: '16px', color: '#666' }}>
          Analyze and view security breach incidents in various formats.
        </p>
      </div>

      {/* Button Group for View Switching */}
      <div className="flex justify-center mb-4 gap-2 md:gap-4">
        <Button
          type={activeView === "table" ? "primary" : "default"}
          onClick={() => handleViewChange("table")}
          className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base"
        >
          <DashboardOutlined style={{ marginRight: '8px' }} />
          Table View
        </Button>
        <Button
          type={activeView === "chart" ? "primary" : "default"}
          onClick={() => handleViewChange("chart")}
          className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base"
        >
          <PieChartOutlined style={{ marginRight: '8px' }} />
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
