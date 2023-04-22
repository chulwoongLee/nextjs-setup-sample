import { Fragment, useState } from "react";
import CustomText from "../atoms/CustomText";
import { Button } from "@mui/material";
import CustomButton from "../atoms/CustomButton";
import CustomTable from "../molecules/CustomTable";
import CustomSelectBox from "../atoms/CustomSelectBox";
import CustomSection from "../molecules/CustomSection";
import CustomCheckBox from "../atoms/CustomCheckBox";
import CustomRadioBox from "../atoms/CustomRadioBox";
import CustomInputText from "../atoms/CustomInputText";
export default function Sample() {
  const options = [
    { key: "Option 1", value: "1" },
    { key: "Option 2", value: "2" },
    { key: "Option 3", value: "3" },
  ];

  function handle() {
    //alert("테스트");
    window.customConfirm({
      status: true,
      titleMessage: "테스트",
      descriptionMessage: "디스크립션~",
      clickEvent: () => {
        window.customLoadingOpen();
        setTimeout(() => {
          window.customLoadingClose();
        }, 2000);
      },
    });
  }
  const [selectedValue, setSelectedValue] = useState("");
  const handleValueChange = (value: string) => {
    console.log(value);
    setSelectedValue(value);
  };
  const [name, setName] = useState("");
  const handleNameChange = (event: string) => {
    setName(event);
  };

  return (
    <Fragment>
      <Button onClick={handle}>테스트</Button>
      <CustomButton
        color="secondary"
        clickEvent={() => {
          alert("테스트");
        }}
      >
        테스트
      </CustomButton>
      <CustomSection>
        <CustomTable
          headerList={["테스트1", "테스트2", "테스트3"]}
          bodyList={[
            { aa: "body1", bb: "body11", cc: "테스트1" },
            { aa: "body2", bb: "body22", cc: "테스트2" },
            { aa: "body3", bb: "body33", cc: "테스트3" },
          ]}
          pages={15}
          pickPage={2}
          pageEvent={(e) => {
            console.log(e);
          }}
        />
      </CustomSection>
      <CustomSelectBox
        placeholder="구분"
        options={options}
        disabled={false}
        value={selectedValue}
        onChange={handleValueChange}
      />
      <CustomSection overflowX>
        <CustomText type="p1" oneLine>
          테스트테스트테스트테스트
        </CustomText>
        <CustomButton color="primary">
          테스트2테스트2테스트2테스트2
        </CustomButton>
        <CustomButton color="primary" fullWidth>
          테스트2테스트2테스트2테스트2
        </CustomButton>
      </CustomSection>
      <CustomSection>
        <CustomCheckBox title="테스트" status clickEvent={() => {}} />
        <CustomCheckBox title="테스트" status={false} clickEvent={() => {}} />
        <CustomRadioBox title="테스트2" status clickEvent={() => {}} />
        <CustomRadioBox title="테스트2" status={false} clickEvent={() => {}} />
      </CustomSection>
      <CustomSection>
        <CustomText type="h6">테스트{name}</CustomText>
        <CustomInputText
          placeholder="테스트"
          value={name}
          setValue={handleNameChange}
          //error
          //helperText="테스트"
        />
      </CustomSection>
    </Fragment>
  );
}
