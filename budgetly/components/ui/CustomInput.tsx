import * as React from "react";

import TextField from "@mui/material/TextField";
import { InputProps } from "@mui/material";

export type Props = InputProps & {
  label?: string;
  variant?: "standard" | "filled" | "outlined";
};

const CustomInput = ({ ...props }: Props) => {
  return (
    <TextField
      label={props.label}
      variant={props.variant}
      onChange={props.onChange}
      size={props.size}
      id={props.id}
      aria-label={props["aria-label"]}
      disabled={props.disabled}
      value={props.value}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      type={props.type}
      sx={{ background: "#0F102B", borderRadius: "30px" }}
    />
  );
};

export default CustomInput;
