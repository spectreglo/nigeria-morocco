import React, { ChangeEvent } from 'react';
import './styles/input.css';
import { Input as AntInput } from 'antd';

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
}
function Input({
  label,
  placeholder,
  type = 'text',
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
}: IProps) {
  return (
    <div style={style} className={`app_input ${className}`}>
      <div className="input_label">
        <span
          style={{
            fontWeight: '500',
            marginBottom: 0,
            color: '#000',
          }}>{`${label}`}</span>
        {required ? <span className="asteric">*</span> : null}
      </div>

      <AntInput
        value={value}
        disabled={disabled}
        style={{
          opacity: disabled ? 0.5 : 1,
          backgroundColor: '#fff',
          border: outlined ? '1px solid #f9f9f9' : '0.2px solid #f9f9f9',
          // borderBottom: outlined
          //   ? "1px solid var(--stroke)"
          //   : "1px solid var(--primary)",

          borderRadius: 5,
          padding: 5,
          paddingLeft: 20,
        }}
        required={required}
        placeholder={placeholder}
        type={type}
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

export default Input;
