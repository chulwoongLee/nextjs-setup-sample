import React from "react";
import { Story, Meta } from "@storybook/react";
import CustomText, { CustomTextProps } from "src/components/atoms/CustomText";

export default {
  title: "atoms/CustomText",
  component: CustomText,
  argTypes: {
    text: { description: "문자값" },
    type: { description: "8개로 구성 된 타입 종류로 문자의 사이즈를 정의" },
    bold: { description: "폰트무게의 값을 정의 true일 경우 bold 아니라면 400" },
    color: { description: "기본값은 000000이며 custom 시 해당 색상으로 변경" },
    pointApply: { description: "...표기여부" },
  },
} as Meta;

const Template: Story<CustomTextProps> = (args) => <CustomText {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "테스트",
  type: "h1",
  color: "#000000",
  oneLine: false,
  multiLine: 4,
  textAlign: "left",
};
