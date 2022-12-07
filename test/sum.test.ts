import { fncSumAmount } from "../src/script/common";

it("합산 테스트", () => {
  expect(fncSumAmount(1, 2)).toBe(3);
});

it("합산테스트2", () => {
  expect(fncSumAmount(1, 1)).toBe(3);
});
