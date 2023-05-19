import { LinearProgress, LinearProgressProps } from "@mui/material";

import React from "react";

type CustomLinearProgressProps = Pick<
  LinearProgressProps,
  "value" | "variant" | "sx" | "color"
> & {};

const CustomLinearProgress = ({
  value,
  variant,
  sx,
  color,
}: CustomLinearProgressProps) => {
  return (
    <LinearProgress
      value={value ?? 0}
      variant={variant}
      color={color}
      sx={{
        marginTop: "10px",
        borderRadius: "5px",
        backgroundColor: "#0F102B",
        height: "10px",
        ".MuiLinearProgress-barColorPrimary": {
          backgroundColor: "#6347EB",
        },
        ".MuiLinearProgress-barColorSecondary": {
          backgroundColor: "#FF6161",
        },
        ...sx,
      }}
    />
  );
};

export default CustomLinearProgress;
