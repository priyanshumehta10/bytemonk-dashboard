import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spin } from "antd";
import moment from "moment";
import DropdownFilter from "../components/DropdownFilter";
import {
  fetchDataRequest,
  filterByUser,
  filterByCategory,
} from "../redux/slices/breachesSlice";

const TableView = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const { data, loading, users, categories, filteredData } = useSelector(
    (state) => state.breaches
  );

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const handleUserFilter = (value) => {
    setSelectedUser(value);
    setSelectedCategory("cut");
    if (value === "cut") {
      dispatch(filterByUser(""));
    } else {
      dispatch(filterByUser(value));
    }
  };

  const handleCategoryFilter = (value) => {
    setSelectedCategory(value);
    setSelectedUser("cut");
    if (value === "cut") {
      dispatch(filterByCategory(""));
    } else {
      dispatch(filterByCategory(value));
    }
  };

  const currentData =
    selectedUser === "cut" && selectedCategory === "cut" ? data : filteredData;

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Details", dataIndex: "details", key: "details" },
    { title: "IP Address", dataIndex: "ipAddress", key: "ipAddress" },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text) => moment(text).format("MMM Do YYYY, h:mm:ss a"),
    },
  ];

  return (
    <div className="p-5 bg-gray-100 relative">
      {/* Filter Section */}
      <div className="absolute top-0 left-0 right-0 flex flex-row md:justify-between  md:gap-4 p-4">
        <div className="flex flex-col w-[40%] mr-9">
          <label className="mb-2 text-sm font-medium">Filter by User</label>
          <DropdownFilter
            options={users}
            onChange={handleUserFilter}
            placeholder="Select User"
            includeCut={true}
            value={selectedUser}
          />
        </div>
        <div className="flex flex-col w-[40%] md:w-auto ">
          <label className="mb-2 text-sm font-medium">Filter by Category</label>
          <DropdownFilter
            options={categories}
            onChange={handleCategoryFilter}
            placeholder="Select Category"
            includeCut={true}
            value={selectedCategory}
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-60 mt-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto mt-20">
          <Table
            dataSource={currentData}
            columns={columns}
            rowKey="id"
            scroll={{ x: "max-content" }}
            bordered
            size="middle"
            className="w-full"
            pagination={{
              pageSize: 13,
              showSizeChanger: false,
              position: ["bottomCenter"], // Ensure pagination is centered
              size: "medium", // Adjust size for better fit
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TableView;
