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
    responsive: true,
    radius: 0.8,
  };

  return (
    <div className="p-4 md:p-5 bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <Card
            title="Breaches by Category"
            className="flex-1 bg-white shadow-md rounded-lg"
            bodyStyle={{ padding: "20px" }}
            style={{ minWidth: 300, overflow: "auto" }}
          >
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col mb-4">
                <label className="mb-2 text-sm font-medium text-gray-700">
                  Filter by User
                </label>
                <DropdownFilter
                  options={users}
                  onChange={handleUserFilter}
                  placeholder="Select User"
                  includeCut={true}
                  value={selectedUser}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="w-full">
                  <Pie {...pieConfig} data={categoryData} />
                </div>
              </div>
            </div>
          </Card>
          <Card
            title="Breaches by User"
            className="flex-1 bg-white shadow-md rounded-lg"
            bodyStyle={{ padding: "20px" }}
            style={{ minWidth: 300, overflow: "auto" }}
          >
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col mb-4">
                <label className="mb-2 text-sm font-medium text-gray-700">
                  Filter by Category
                </label>
                <DropdownFilter
                  options={categories}
                  onChange={handleCategoryFilter}
                  placeholder="Select Category"
                  includeCut={true}
                  value={selectedCategory}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="w-full">
                  <Pie {...pieConfig} data={userData} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PieChartView;
