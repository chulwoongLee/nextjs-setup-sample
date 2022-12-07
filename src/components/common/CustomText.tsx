import { fncSumAmount } from "src/script/common";
import { Button } from "@mui/material";
import { Fragment } from "react";
export function DefaultText() {
  function aa() {
    const q = fncSumAmount(1, 2);
  }
  return (
    <Fragment>
      <span>aa</span>
      <Button>테스트</Button>
    </Fragment>
  );
}
