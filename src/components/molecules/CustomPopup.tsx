import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomSection from "./CustomSection";

interface CustomPopupProps {
  status: boolean;
  customWidth?: number;
  title: string;
  closeFunction: () => void;
  children: React.ReactNode;
  fullScreen?: boolean;
}

export default function CustomPopup(props: CustomPopupProps) {
  const { status, customWidth, title, closeFunction, children, fullScreen } =
    props;

  const handleClose = () => {
    closeFunction();
  };

  return (
    <Dialog
      open={status}
      //sx={{ maxWidth: fullWidth ? "unset" : customWidth ?? 320 }}
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ minWidth: 320 }}>
        <CustomSection flexDirection="row" justifyContent="space-between">
          {title}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </CustomSection>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
