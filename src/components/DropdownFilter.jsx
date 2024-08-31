import React from "react";
import { Select } from "antd";

const { Option } = Select;

const DropdownFilter = ({
  options,
  onChange,
  placeholder,
  includeCut,
  value,
}) => {
  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      style={{ width: "180px" }}
      value={value}
    >
      {includeCut && <Option value="cut">All</Option>}
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default DropdownFilter;
