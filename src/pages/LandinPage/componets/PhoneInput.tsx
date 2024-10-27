import { Input, Select } from "antd";
import { ReactElement, useEffect, useState } from "react";
import coutries from "../../../utils/coutries.json";
interface IProps {
  value: string;
  label: ReactElement;
}
interface OptionProps {
  phone: string;
  value: string;
  setValue: (e: string) => void;
  setPhone: (e: string) => void;
}
export default function PhoneInput({
  phone,
  setPhone,
  value,
  setValue,
}: OptionProps) {
  const [options, setOptions] = useState<IProps[] | []>([]);

  useEffect(() => {
    const allOptions: IProps[] = [];
    coutries.map((c) => {
      allOptions.push({
        value: c.code,
        label: (
          <span>
            {c.emoji} {c.code}
          </span>
        ),
      });
    });
    setOptions(allOptions);
  }, []);
  return (
    <div className="flex justify-between items-center px-2 bg-[#F2F2F2] rounded-lg w-[70%] h-[40px] my-6 py-4">
      <Select value={value} onChange={(e) => setValue(e)} options={options} />
      <Input
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
        className="flex-1 bg-transparent border-0 focus:border-0"
      />
    </div>
  );
}
