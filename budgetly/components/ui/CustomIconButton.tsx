import * as React from "react";

import { IconButton, IconButtonProps } from "@mui/material";

type CustomIconButtonProps = Pick<
  IconButtonProps,
  | "color"
  | "onClick"
  | "size"
  | "type"
  | "sx"
  | "disabled"
  | "children"
  | "value"
  | "className"
>;

const CustomIconButton = ({ ...props }: CustomIconButtonProps) => {
  return (
    <IconButton
      {...props}
      color={props.color}
      onClick={props.onClick}
      size={props.size}
      type={props.type}
      sx={{ ...props.sx }}
      value={props.value}
      disabled={props.disabled}
      className={props.className}
    >
      {props.children}
    </IconButton>
  );
};

export default CustomIconButton;
