import React from "react";

export interface CustomTextProps {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p1"
    | "p2"
    | "p3"
    | "p4"
    | "p5"
    | "p6";
  color?: string;
  multiLine?: number;
  oneLine?: boolean;
  textAlign?: "left" | "center" | "right";
  children?: any;
}

export default function CustomText(props: CustomTextProps) {
  const {
    type,
    color = "#000000",
    children,
    multiLine,
    oneLine,
    textAlign = "left",
  } = props;
  const fontWeight = type.startsWith("h") ? "bold" : 500;
  const Tag =
    type === "p1" ||
    type === "p2" ||
    type === "p3" ||
    type === "p4" ||
    type === "p5" ||
    type === "p6"
      ? `p`
      : type;

  const styles: React.CSSProperties = {
    fontSize: getFontSize(type),
    fontWeight,
    color,
    textAlign,
  };

  if (multiLine) {
    styles.overflow = "hidden";
    styles.textOverflow = "ellipsis";
    styles.display = "-webkit-box";
    styles.WebkitLineClamp = multiLine;
    styles.WebkitBoxOrient = "vertical";
  } else if (oneLine) {
    styles.overflow = "hidden";
    styles.textOverflow = "clip";
    styles.whiteSpace = "nowrap";
  }

  return <div style={styles}>{children}</div>;
}

const getFontSize = (type: string): string => {
  switch (type) {
    case "h1":
      return "32px";
    case "h2":
      return "28px";
    case "h3":
      return "24px";
    case "h4":
      return "20px";
    case "h5":
      return "16px";
    case "h6":
      return "14px";
    case "p1":
      return "24px";
    case "p2":
      return "20px";
    case "p3":
      return "16px";
    case "p4":
      return "14px";
    case "p5":
      return "12px";
    case "p6":
      return "10px";
    default:
      return "12px";
  }
};
