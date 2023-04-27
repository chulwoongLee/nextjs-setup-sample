import "./globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { CircularProgress, Modal } from "@mui/material";
import CustomText from "src/components/atoms/CustomText";
import CustomButton from "src/components/atoms/CustomButton";
import CustomSection from "src/components/molecules/CustomSection";

declare global {
  interface Window {
    customConfirm: Function;
    customLoadingOpen: Function;
    customLoadingClose: Function;
    customLogin: Function;
  }
}
interface confirmMessageProps {
  status: boolean;
  titleMessage: string;
  descriptionMessage: string;
  clickEvent: Function;
}

export default function App({ Component, pageProps }: AppProps) {
  const [alertMessage, setAlertMessage] = useState("");
  const confirmMessageDefaultValue = {
    status: false,
    titleMessage: "",
    descriptionMessage: "",
    clickEvent: () => {},
  };
  const [confirmMessage, setConfirmMessage] = useState<confirmMessageProps>(
    confirmMessageDefaultValue
  );
  const [loadingStatus, setLoadingStatus] = useState(false);

  //onLoad
  useEffect(() => {
    let firstVh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${firstVh}px`);
    //모바일환경에서의 height 100%처리위한 코드
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
    //커스텀얼랏
    window.alert = (popupMessage: string) => {
      setAlertMessage(popupMessage);
    };
    //커스텀컨펌
    window.customConfirm = (confirmPopupMessage: confirmMessageProps) => {
      setConfirmMessage(confirmPopupMessage);
    };
    //전체화면 스피너 처리
    window.customLoadingOpen = () => {
      setLoadingStatus(true);
    };
    window.customLoadingClose = () => {
      setLoadingStatus(false);
    };
  }, []);

  return (
    <article
      style={{
        width: "100%",
        height: `calc(var(--vh, 1vh) * 100)`,
        alignItems: "center",
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Component {...pageProps} />
      <Modal
        open={alertMessage.length > 0}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <section
          style={{
            minWidth: 150,
            maxWidth: 300,
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            padding: "20px 16px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <CustomText type="h4" textAlign="center">
            {alertMessage}
          </CustomText>
          <CustomButton
            clickEvent={() => {
              setAlertMessage("");
            }}
            fullWidth
          >
            확인
          </CustomButton>
        </section>
      </Modal>
      <Modal
        open={confirmMessage.status}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <section
          style={{
            maxWidth: 380,
            backgroundColor: "#FFFFFF",
            borderRadius: 5,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <CustomText type="h4" textAlign="center">
            {confirmMessage.titleMessage}
          </CustomText>
          <CustomText type="p4" color="#666666" textAlign="center">
            {confirmMessage.descriptionMessage}
          </CustomText>

          <CustomSection noMargin gap={8}>
            <CustomButton
              color="secondary"
              clickEvent={() => {
                setConfirmMessage(confirmMessageDefaultValue);
              }}
              fullWidth
            >
              닫기
            </CustomButton>
            <CustomButton
              clickEvent={() => {
                confirmMessage.clickEvent();
                setConfirmMessage(confirmMessageDefaultValue);
              }}
              fullWidth
            >
              확인
            </CustomButton>
          </CustomSection>
        </section>
      </Modal>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={loadingStatus}
        hideBackdrop
      >
        <CircularProgress />
      </Modal>
    </article>
  );
}
