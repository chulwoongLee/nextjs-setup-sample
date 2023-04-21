import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
} from "@mui/material";
import CustomText from "../atoms/CustomText";
import CustomSelectBox from "../atoms/CustomSelectBox";

interface CustomTableProps {
  headerList: string[];
  bodyList: Array<{ [key: string]: string | number | ReactNode }>;
  searchCountValue?: "50" | "100";
  pages?: number;
  pickPage?: number;
  pageEvent?: (page: number) => void;
}

export default function CustomTable({
  headerList,
  bodyList,
  pages,
  pickPage,
  pageEvent,
  searchCountValue,
}: CustomTableProps) {
  const showPagination = pages && pages > 1;

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>총 {bodyList.length}개</div>
        <CustomSelectBox
          placeholder="보기"
          options={[
            { key: "50개", value: "50" },
            { key: "100개", value: "100" },
          ]}
          value={searchCountValue ?? "50"}
          onChange={(value) => {
            console.log(value);
          }}
          dontPickUndefindValue
        />
      </Box>
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: "collapse",
          "& th, & td": {
            border: "1px solid #e0e0e0",
          },
        }}
      >
        <TableHead>
          <TableRow>
            {headerList.map((header, index) => (
              <TableCell
                key={index}
                align="center"
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                <CustomText type="h6" textAlign="center">
                  {header}
                </CustomText>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyList.length > 0 ? (
            bodyList.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                //sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row).map((key, cellIndex) => (
                  <TableCell key={cellIndex} align="center">
                    {typeof row[key] === "string" ||
                    typeof row[key] === "number" ? (
                      <CustomText type="p2" textAlign="center">
                        {row[key]}
                      </CustomText>
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headerList.length} align="center">
                <CustomText type="p2" textAlign="center">
                  데이터가 없습니다.
                </CustomText>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showPagination && (
        <Pagination
          count={pages || 1}
          page={pickPage || 1}
          onChange={(_, page) => {
            if (pageEvent) {
              pageEvent(page);
            }
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        />
      )}
    </TableContainer>
  );
}
