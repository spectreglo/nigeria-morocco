import React, { ChangeEvent } from "react";
import "./styles/input.css";
import { Input as AntInput } from "antd";

interface IProps {
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  outlined: boolean;
  name?: string;
  id?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  value?: string;
  className?: string;
  prefix?: React.ReactNode;
}
function Input({
  label,
  placeholder,
  type = "text",
  required = false,
  style,
  disabled,
  outlined,
  name,
  id,
  onChange,
  error,
  value,
  className,
  prefix,
}: IProps) {
  return (
    <div style={style} className={`app_input ${className}`}>
      <div className="input_label">
        <span
          style={{
            fontWeight: "500",
            marginBottom: 0,
            color: "#000",
          }}
        >{`${label}`}</span>
        {required ? <span className="asteric">*</span> : null}
      </div>
      <div style={{ position: "relative" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              color: "#888",
              fontWeight: 500,
            }}
          >
            {prefix}
          </span>
        )}
        <AntInput
          value={value}
          disabled={disabled}
          style={{
            opacity: disabled ? 0.5 : 1,
            backgroundColor: "#fff",
            border: outlined ? "1px solid #c0c0c0ff" : "0.2px solid #f9f9f9",
            borderRadius: 5,
            padding: 5,
            paddingLeft: prefix ? 28 : 20,
            height: "38px",
          }}
          required={required}
          placeholder={placeholder}
          type={type}
          id={id}
          name={name}
          onChange={(e) => onChange?.(e)}
        />
      </div>
      {error && (
        <div className="input_error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
