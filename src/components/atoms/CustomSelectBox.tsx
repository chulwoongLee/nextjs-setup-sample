import React from "react";
import { Select, MenuItem } from "@mui/material";

interface CustomSelectBoxProps {
  placeholder: string;
  options: { key: string; value: string }[];
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  dontPickUndefindValue?: boolean;
}

export default function CustomSelectBox(props: CustomSelectBoxProps) {
  const {
    placeholder,
    options,
    disabled = false,
    value,
    onChange,
    dontPickUndefindValue,
  } = props;

  return (
    <Select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      disabled={disabled}
      displayEmpty
      size="small"
    >
      <MenuItem value="" disabled={dontPickUndefindValue}>
        {" "}
        {placeholder}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.key} value={option.value}>
          {option.key}
        </MenuItem>
      ))}
    </Select>
  );
}
