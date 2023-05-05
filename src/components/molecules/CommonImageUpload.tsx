import { Fragment, useRef, useState, useEffect } from "react";
import CustomPopup from "./CustomPopup";
import CustomText from "../atoms/CustomText";
import CustomButton from "../atoms/CustomButton";
//import CustomIcon from "../atoms/CustomIcon";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomSection from "./CustomSection";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
interface CommonImageUploadProps {
  multiple?: number;
  Volume: number;
  acceptedExtensions: string[];
}
export default function CommonImageUpload(props: CommonImageUploadProps) {
  const { multiple, Volume, acceptedExtensions } = props;
  const fileRef = useRef<any>(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [overStatus, setOverStatus] = useState(false);

  const isFileSizeValid = (file: File) => {
    return file.size / 1024 <= Volume;
  };

  const areAllFilesValid = (files: FileList) => {
    return Array.from(files).every(isFileSizeValid);
  };

  const handleImages = (files: FileList) => {
    const newImageUrls: string[] = [];
    const totalFiles = files.length;
    let filesProcessed = 0;
    if (!areAllFileExtensionsValid(files)) {
      alert("유효하지 않은 확장자를 가진 파일이 하나 이상 존재합니다.");
      return;
    }
    if (multiple && totalFiles + imageUrls.length > multiple) {
      alert("최대 허용 파일 개수를 초과하였습니다.");
      return;
    }

    if (!areAllFilesValid(files)) {
      alert("하나 이상의 파일이 최대 파일 크기를 초과합니다.");
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        newImageUrls.push(event.target.result);
        filesProcessed++;
        if (filesProcessed === totalFiles) {
          setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
        }
      };
    });
  };

  const onFileInputChange = (e: any) => {
    console.log(e.target.files);
    const files = e.target.files;
    if (files.length > 0) {
      handleImages(files);
    }
  };
  const removeImage = (index: number) => {
    setImageUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls.splice(index, 1);
      return newUrls;
    });
  };
  // 파일 확장자 확인 함수
  const isFileExtensionValid = (file: File) => {
    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();
    return acceptedExtensions.includes(fileExtension);
  };

  // 모든 파일이 올바른 확장자를 가지고 있는지 확인하는 함수
  const areAllFileExtensionsValid = (files: FileList) => {
    return Array.from(files).every(isFileExtensionValid);
  };
  const moveItem = (dragIndex: any, hoverIndex: any) => {
    console.log("실행~?");
    console.log("dragIndex: " + dragIndex + " hoverIndex: " + hoverIndex);
    const draggedItem = imageUrls[dragIndex];
    const newSampleData = [...imageUrls];
    newSampleData.splice(dragIndex, 1);
    newSampleData.splice(hoverIndex, 0, draggedItem);
    console.log("원본: ");
    console.log(imageUrls);
    console.log("변경: ");
    console.log(newSampleData);
    setImageUrls([...newSampleData]);
  };
  const acceptString = acceptedExtensions
    .flatMap((ext) => [`.${ext.toLowerCase()}`, `.${ext.toUpperCase()}`])
    .join(", ");
  return (
    <Fragment>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => {
          if (multiple) {
            setModalStatus(true);
          } else {
            fileRef.current.click();
          }
        }}
      >
        <img
          src="/img/img-button-fileupload.png"
          style={{ width: 100, height: 70, objectFit: "contain" }}
        />
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileRef}
          accept={acceptString}
          onChange={onFileInputChange}
          multiple={multiple ? true : false}
        />
      </div>
      <CustomPopup
        status={modalStatus}
        customWidth={440}
        title="이미지 업로드"
        closeFunction={() => {
          setModalStatus(false);
        }}
      >
        <CustomSection flexDirection="column" alignItems="flex-start">
          <section
            style={{
              cursor: "pointer",
              width: "100%",
              height: 130,
              backgroundColor: "#FAFAFA",
              borderRadius: 4,
              border: `1px dashed ${overStatus ? "#FF008A" : "#CCCCCC"}`,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
            onClick={() => {
              fileRef.current.click();
            }}
            onMouseOver={() => {
              setOverStatus(true);
            }}
            onMouseOut={() => {
              setOverStatus(false);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setOverStatus(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setOverStatus(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setOverStatus(false);
              if (e.dataTransfer.files.length > 0) {
                handleImages(e.dataTransfer.files);
              }
            }}
          >
            <div
              style={{
                height: 16,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {/* <CustomIcon
                url="/icon-upload"
                size={16}
                color={overStatus ? "#FF008A" : undefined}
              /> */}
              <UploadFileIcon />
            </div>
            <CustomText type="p5" color="#666666">
              업로드할 파일을 이 영역으로
              <br />
              클릭하거나 드래그 합니다.
            </CustomText>
          </section>
          <CustomSection
            flexDirection="row"
            justifyContent="flex-start"
            noMargin
          >
            <CustomText type="p6" color="#333333">
              업로드된 이미지
            </CustomText>
            <CustomText type="p6" color="#CCCCCC">
              <span style={{ color: "#333333" }}>{imageUrls.length}</span>/
              {multiple}
            </CustomText>
          </CustomSection>
        </CustomSection>
        <CustomSection flexDirection="column">
          <DndProvider backend={HTML5Backend}>
            <CustomSection
              flexDirection="row"
              noMargin
              gap={4}
              flexWrap
              justifyContent="flex-start"
            >
              {imageUrls.map((dataList, index) => (
                <ComponentCustomImageController
                  key={index}
                  dataList={dataList}
                  index={index}
                  moveItem={moveItem}
                  removeImage={() => {
                    removeImage(index);
                  }}
                />
              ))}
            </CustomSection>
          </DndProvider>
        </CustomSection>
      </CustomPopup>
    </Fragment>
  );
}
interface ComponentCustomImageControllerProps {
  removeImage: Function;
  dataList: any;
  index: number;
  moveItem: Function;
}
function ComponentCustomImageController(
  props: ComponentCustomImageControllerProps
) {
  const { removeImage, dataList, index, moveItem } = props;
  const [hoverStatus, setHoverStatus] = useState(false);
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { id: index, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ isOver }, dropRef] = useDrop({
    accept: "item",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: { id: number }) => {
      console.log("드랍 이벤트 발생");
      const dragIndex = item.id;
      const hoverIndex = index;
      console.log(dragIndex);
      console.log(hoverIndex);
      if (dragIndex === hoverIndex) return;
      moveItem(dragIndex, hoverIndex);
    },
  });
  useEffect(() => {
    setHoverStatus(isOver);
  }, [isOver]);
  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{
        width: 90,
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        position: "relative",
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
        border: `1px solid ${hoverStatus ? "#FF008A" : "#CCCCCC"}`,
        opacity: isDragging ? 0.2 : 1,
      }}
    >
      {dataList && (
        <img
          src={dataList}
          style={{ width: 85, height: 85, objectFit: "contain" }}
        />
      )}
      <div
        style={{
          cursor: "pointer",
          position: "absolute",
          top: 6,
          right: 6,
        }}
        onClick={() => {
          window.customConfirm({
            status: true,
            titleMessage: "이미지 제거",
            descriptionMessage: "정말 제거 하시겠습니까?",
            clickEvent: () => {
              removeImage();
            },
          });
        }}
      >
        {/*<CustomIcon url="/icon-x-input" size={16} /> */}
        <CloseIcon />
      </div>
    </div>
  );
}
