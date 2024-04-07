interface IProps {
  title: string;
  image: string;
  checked: boolean;
  onClick: () => void;
}

export default function PaymentType({
  image,
  title,
  checked,
  onClick,
}: IProps) {
  return (
    <div
      style={{
        opacity: checked ? 1 : 0.5,
        transition: 'all 0.5s',
      }}
      onClick={onClick}
      className="w-full md:w-1/2 h-[48px] border border-[#9D9DB7] rounded flex items-center p-2 bg-white cursor-pointer">
      <input checked={checked} className="mr-2" type="checkbox" />
      <img src={image} className="h-[20px] w-[20px] mx-4" />
      <h1>{title}</h1>
    </div>
  );
}
