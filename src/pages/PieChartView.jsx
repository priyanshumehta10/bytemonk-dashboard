import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pie } from "@ant-design/charts";
import { Spin, Card } from "antd";
import DropdownFilter from "../components/DropdownFilter";
import {
  fetchDataRequest,
  filterByUser,
  filterByCategory,
} from "../redux/slices/breachesSlice";

const PieChartView = () => {
  const dispatch = useDispatch();
  const { loading, users, categories, data, filteredData } = useSelector(
    (state) => state.breaches
  );
  const [useFilteredData, setUseFilteredData] = useState(true);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const handleUserFilter = (value) => {
    setSelectedUser(value);
    setSelectedCategory("cut");
    if (value === "cut") {
      setUseFilteredData(false);
      dispatch(filterByUser(""));
    } else {
      setUseFilteredData(true);
      dispatch(filterByUser(value));
    }
  };

  const handleCategoryFilter = (value) => {
    setSelectedCategory(value);
    setSelectedUser("cut");
    if (value === "cut") {
      setUseFilteredData(false);
      dispatch(filterByCategory(""));
    } else {
      setUseFilteredData(true);
      dispatch(filterByCategory(value));
    }
  };

  const currentData = useFilteredData ? filteredData : data;

  const categoryData = Object.entries(
    currentData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([type, value]) => ({ type, value }));

  const userData = Object.entries(
    currentData.reduce((acc, item) => {
      acc[item.user] = (acc[item.user] || 0) + 1;
      return acc;
    }, {})
  ).map(([type, value]) => ({ type, value }));

  const pieConfig = {
    angleField: "value",
    colorField: "type",
    label: {
      text: (d) => `${d.type}\n ${d.value}`,
      position: "spider",
      style: {
        fontSize: 12,
        fill: "#000",
        fontWeight: "bold",
        textAlign: "center",
      },
      offset: 100,
    },
    legend: {
      color: {
        title: false,
        position: "top",
        rowPadding: 5,
      },
    },
    height: 300,
    width: 400,
    responsive: true,
    radius: 0.8,
  };

  return (
    <div className="p-4 md:p-5 bg-gray-100">
      {/* Filter Section */}
      <Card
        className="mb-5 p-4 rounded-lg bg-white shadow-md"
        bodyStyle={{ padding: "20px" }}
      >
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
          <div className="flex flex-col w-full md:w-auto">
            <label className="mb-2 text-sm font-medium">Filter by User</label>
            <DropdownFilter
              options={users}
              onChange={handleUserFilter}
              placeholder="Select User"
              includeCut={true}
              value={selectedUser}
              className="w-full md:w-auto"
            />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <label className="mb-2 text-sm font-medium">
              Filter by Category
            </label>
            <DropdownFilter
              options={categories}
              onChange={handleCategoryFilter}
              placeholder="Select Category"
              includeCut={true}
              value={selectedCategory}
              className="w-full md:w-auto"
            />
          </div>
        </div>
      </Card>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 justify-center overflow-hidden">
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/2 overflow-hidden">
            <Card
              title="Breaches by Category"
              className="w-full p-4 bg-white shadow-md"
              bodyStyle={{ padding: "0" }}
            >
              <div className="h-80 w-full flex justify-center items-center overflow-hidden">
                <Pie {...pieConfig} data={categoryData} />
              </div>
            </Card>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/2 overflow-hidden">
            <Card
              title="Breaches by User"
              className="w-full p-4 text-center bg-white shadow-md"
              bodyStyle={{ padding: "0" }}
            >
              <div className="h-80 w-full flex justify-center items-center overflow-hidden">
                <Pie {...pieConfig} data={userData} />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChartView;
