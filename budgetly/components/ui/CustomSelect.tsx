import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Option = {
  label: string | number;
  value: string | number;
};

type CustomSelectProps = {
  id?: string;
  label?: string;
  labelId?: string;
  value: string | number;
  defaultValue?: string | number;
  options: Option[];
  sx?: any;
  className?: string;
  displayEmpty?: boolean;

  onChange: (
    event: SelectChangeEvent<string | number>,
    child: React.ReactNode
  ) => void;
};

const CustomSelect = ({
  id,
  label,
  labelId,
  value,
  options,
  onChange,
  defaultValue,
  className,
  displayEmpty,

  sx,
}: CustomSelectProps) => {
  return (
    <>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        defaultValue={defaultValue}
        className={className}
        displayEmpty={displayEmpty}
        sx={{
          ...sx,
          backgroundColor: "#0F102B",
          color: "#fff",
          borderRadius: "30px",
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label || ""}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
export default CustomSelect;
