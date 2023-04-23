import { ClassNames } from "@emotion/react";
import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";

type CustomButtonProps = Pick<
  ButtonProps,
  | "color"
  | "variant"
  | "onClick"
  | "size"
  | "type"
  | "sx"
  | "disabled"
  | "children"
  | "href"
> & {
  as?: React.ElementType;
  text: string;
};
const MuiButton = ({ ...props }: CustomButtonProps) => {
  return (
    <Button
      {...props}
      variant={props.variant}
      onClick={props.onClick}
      size={props.size}
      href={props.href}
      type={props.type}
      disabled={props.disabled}
      sx={props.sx}
    >
      {props.text}
    </Button>
  );
};

export default MuiButton;
