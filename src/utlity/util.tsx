import { setCookie, getCookie, deleteCookie } from "cookies-next";
export function globalSetCookie(name: string, value: any) {
  setCookie(name, value, { path: "/" });
}
export function globalGetCookie(name: string) {
  return getCookie(name, { path: "/" });
}
export function globalDeleteCookie(name: string) {
  deleteCookie(name, { path: "/" });
}
//정규식 패턴으로 숫자만 추출
export function getNumValue(param: string) {
  try {
    var testString = param;
    var regex = /[^0-9]/g;
    var result = testString.replace(regex, "");
    return result;
  } catch (ex) {
    return param;
  }
}

//이메일 벨리데이션
export function validationCheckEmail(email: string) {
  const emailValidationCheck =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
      email
    );
  return emailValidationCheck;
}
