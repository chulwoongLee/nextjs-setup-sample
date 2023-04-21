import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";

interface CustomSectionProps {
  children: ReactNode;
  flexDirection?: "row" | "column";
  alignItems?: "flex-start" | "flex-end" | "center" | "space-between";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
  flexWrap?: boolean;
  noMargin?: boolean;
  gap?: number;
  overflowX?: boolean;
  overflowY?: boolean;
}

const CustomSectionWrapper = styled("div")<CustomSectionProps>(
  ({
    flexDirection = "row",
    alignItems = "center",
    justifyContent = "center",
    flexWrap = false,
    noMargin = false,
    overflowX,
    overflowY,
    gap,
  }) => ({
    display: "flex",
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap: flexWrap ? "wrap" : "nowrap",
    margin: noMargin ? 0 : "0 16px",
    overflow: "hidden",
    overflowX: overflowX ? "auto" : "hidden",
    overflowY: overflowY ? "auto" : "hidden",
    gap: gap,
  })
);

export default function CustomSection({
  children,
  flexDirection = "row",
  alignItems = "center",
  justifyContent = "center",
  flexWrap = false,
  noMargin = false,
  gap = 6,
}: CustomSectionProps) {
  return (
    <CustomSectionWrapper
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      flexWrap={flexWrap}
      noMargin={noMargin}
      gap={gap}
    >
      {children}
    </CustomSectionWrapper>
  );
}
