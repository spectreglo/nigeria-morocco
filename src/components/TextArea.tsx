import React, { ChangeEvent } from "react";
import "./styles/input.css";
import { Input } from "antd";

interface IProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  outlined: boolean;
  name?: string;
  id?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  value?: string;
  className?: string;
}

const { TextArea } = Input;

function AntTextArea({
  label,
  placeholder,
  required = false,
  style,
  disabled,
  outlined,
  name,
  id,
  error,
  onChange,
  value,
  className,
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

      <TextArea
        value={value}
        disabled={disabled}
        style={{
          opacity: disabled ? 0.5 : 1,
          backgroundColor: "#fff",
          border: outlined ? "1px solid #c0c0c0ff" : "0.2px solid #f9f9f9",
          // borderBottom: outlined
          //   ? "1px solid var(--stroke)"
          //   : "1px solid var(--primary)",

          borderRadius: 5,
          padding: 5,
          paddingLeft: 20,
        }}
        required={required}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={(e) => onChange?.(e)}
      />
      {error && (
        <div className="input_error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default AntTextArea;
