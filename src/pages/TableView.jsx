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
  const [selectedUser, setSelectedUser] = useState("cut");
  const [selectedCategory, setSelectedCategory] = useState("cut");
  const { data, loading, users, categories, filteredData } = useSelector(
    (state) => state.breaches
  );

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const handleUserFilter = (value) => {
    setSelectedUser(value);
    setSelectedCategory(undefined);
    if (value === "cut") {
      dispatch(filterByUser(""));
    } else {
      dispatch(filterByUser(value));
    }
  };

  const handleCategoryFilter = (value) => {
    setSelectedCategory(value);
    setSelectedUser(undefined);
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
    <div className="p-5 bg-gray-100">
      {/* Filter Section */}
      <div className="mb-4 flex flex-wrap justify-between gap-4">
        <div className="flex flex-col w-full md:w-auto">
          <label className="mb-2 text-sm font-medium">Filter by User</label>
          <DropdownFilter
            options={users}
            onChange={handleUserFilter}
            placeholder="Select User"
            includeCut={true}
            value={selectedUser}
          />
        </div>
        <div className="flex flex-col w-full md:w-auto">
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
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto">
          <Table
            dataSource={currentData}
            columns={columns}
            rowKey="id"
            scroll={{ x: "max-content" }}
            bordered
            size="middle"
            className="w-full"
            pagination={{ pageSize: 13 }}
          />
        </div>
      )}
    </div>
  );
};

export default TableView;
