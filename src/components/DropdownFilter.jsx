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
      value={value}
      className="w-full md:w-auto" // Use Tailwind classes for responsiveness
      dropdownStyle={{ minWidth: "180px" }} // Ensure a minimum width for the dropdown
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
