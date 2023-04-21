import React from "react";
import Radio from "@mui/material/Radio";
import CustomText from "./CustomText";

export interface CustomRadioBoxProps {
  status: boolean;
  clickEvent: () => void;
  disabledStatus?: boolean;
  title?: string;
}

export default function CustomRadioBox(props: CustomRadioBoxProps) {
  const { status, clickEvent, disabledStatus = false, title } = props;

  return (
    <div
      onClick={clickEvent}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <Radio
        checked={status}
        disabled={disabledStatus}
        size="small"
        color="primary"
      />
      {title && <CustomText type="p2">{title}</CustomText>}
    </div>
  );
}
