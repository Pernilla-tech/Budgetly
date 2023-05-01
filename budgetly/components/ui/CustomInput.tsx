import * as React from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { InputAdornment, InputProps } from "@mui/material";

export type Props = TextFieldProps & {
  InputProps?: InputProps;
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
      sx={{
        background: "#0F102B",
        borderRadius: "30px",
        color: "white",
        ...props.sx,
      }}
      InputProps={{
        ...props.InputProps,
        endAdornment: props.InputProps?.endAdornment && (
          <InputAdornment position="end">
            {props.InputProps.endAdornment}
          </InputAdornment>
        ),
        startAdornment: props.InputProps?.startAdornment && (
          <InputAdornment position="start">
            {props.InputProps.startAdornment}
          </InputAdornment>
        ),
        sx: {
          ...props.InputProps?.sx,
          background: "#2B2C4B",
          borderRadius: "30px",
          color: "white",
        },
      }}
    />
  );
};

export default CustomInput;
