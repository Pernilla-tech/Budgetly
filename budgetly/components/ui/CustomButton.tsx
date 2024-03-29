import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";

type CustomButtonProps = Pick<
  ButtonProps,
  | "variant"
  | "onClick"
  | "size"
  | "type"
  | "sx"
  | "disabled"
  | "children"
  | "href"
  | "startIcon"
  | "endIcon"
  | "fullWidth"
  | "className"
> & {
  as?: React.ElementType;
  text?: string;
  color?:
    | "purple"
    | "red"
    | "darkpurple"
    | "default"
    | "blue"
    | "darkestpurple";
};

const CustomButton = ({
  color = "darkpurple",
  ...props
}: CustomButtonProps) => {
  let backgroundColor;
  switch (color) {
    case "purple":
      backgroundColor = "#7B61FF";
      break;
    case "red":
      backgroundColor = "#FF6161";
      break;
    case "darkpurple":
      backgroundColor = "#4A4D78";
      break;
    case "blue":
      backgroundColor = "#61A0FF";
      break;
    case "darkestpurple":
      backgroundColor = "#2B2C4B";
    default:
      backgroundColor = "#4A4D78";
  }
  return (
    <Button
      {...props}
      variant={props.variant}
      onClick={props.onClick}
      size={props.size}
      href={props.href}
      type={props.type}
      disabled={props.disabled}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      className={props.className}
      sx={{
        ...props.sx,
        backgroundColor,
        cursor: "pointer",
        color: "white",
        borderRadius: "25px",
        padding: "10px 20px",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#7B61FF",
        },
        "&:disabled": {
          backgroundColor: "#4A4D78",
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
