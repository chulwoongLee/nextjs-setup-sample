import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CustomText from "./CustomText";

export interface CustomCheckBoxProps {
  status: boolean;
  clickEvent: () => void;
  disabledStatus?: boolean;
  title?: string;
}

export default function CustomCheckBox(props: CustomCheckBoxProps) {
  const { status, clickEvent, disabledStatus = false, title } = props;

  return (
    <div
      onClick={clickEvent}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <Checkbox
        checked={status}
        disabled={disabledStatus}
        size="small"
        color="primary"
      />
      {title && <CustomText type="p2">{title}</CustomText>}
    </div>
  );
}
