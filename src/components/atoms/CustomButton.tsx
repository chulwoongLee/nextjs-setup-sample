import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";
import CustomText, { CustomTextProps } from "./CustomText";

interface CustomButtonProps {
  size?: "large" | "medium" | "small";
  color?: "primary" | "secondary";
  fullWidth?: boolean;
  clickEvent?: () => void;
  disabledStatus?: boolean;
  children: React.ReactNode;
}

export default function CustomButton(props: CustomButtonProps) {
  const {
    size,
    color = "primary",
    fullWidth = false,
    clickEvent,
    disabledStatus = false,
    children,
    ...other
  } = props;

  const buttonTextType = getButtonType(size ?? "small");
  const buttonHeight = getButtonHeight(size ?? "small");
  const textColor = getTextColor(color);

  return (
    <Button
      variant="contained"
      color={color}
      fullWidth={fullWidth}
      onClick={clickEvent}
      disabled={disabledStatus}
      sx={{
        height: buttonHeight,
      }}
      {...other}
    >
      <CustomText type={buttonTextType} color={textColor} oneLine>
        {children}
      </CustomText>
    </Button>
  );
}

const getButtonType = (size: string): CustomTextProps["type"] => {
  switch (size) {
    case "large":
      return "h3";
    case "medium":
      return "p2";
    case "small":
      return "p4";
    default:
      return "p2";
  }
};

const getButtonHeight = (size: string): string => {
  switch (size) {
    case "large":
      return "64px";
    case "medium":
      return "48px";
    case "small":
      return "36px";
    default:
      return "48px";
  }
};
const getTextColor = (color: string): string => {
  switch (color) {
    case "primary":
      return "#FFFFFF";
    case "secondary":
      return "#FFFFFF";
    default:
      return "#000000";
  }
};
