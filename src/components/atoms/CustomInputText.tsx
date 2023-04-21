import React, { useState, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface CustomInputTextProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  placeholder?: string;
  multiLine?: boolean;
}

export default function CustomInputText(props: CustomInputTextProps) {
  const {
    value,
    setValue,
    error,
    helperText,
    disabled,
    fullWidth,
    placeholder,
    multiLine,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setValue("");
    console.log(inputRef.current);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TextField
      value={value}
      onChange={(event) => setValue(event.target.value)}
      error={error}
      helperText={error && helperText}
      disabled={disabled}
      fullWidth={fullWidth}
      placeholder={placeholder}
      multiline={multiLine}
      rows={multiLine ? 4 : 1}
      InputProps={{
        endAdornment: value && !disabled && (
          <InputAdornment
            style={{
              opacity: value && !disabled && isFocused ? 1 : 0,
            }}
            position="end"
          >
            <IconButton
              size="small"
              onClick={() => {
                console.log("실행");
                handleClear();
              }}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
      }}
      inputRef={inputRef}
      size="small"
      style={{
        width: fullWidth ? "100%" : 200,
      }}
    />
  );
}
