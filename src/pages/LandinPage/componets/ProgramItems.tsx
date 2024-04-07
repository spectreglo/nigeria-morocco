export default function ProgramItems({ title = '', content = '', icon = '' }) {
  return (
    <div className="h-[224px] w-full flex flex-col items-center gap-4 justify-center shadow">
      <img src={icon} />
      <h1 className="text-2xl text-fontColor font-bold">{title}</h1>
      <p className="text-center text-fontColor text-[13px]">{content}</p>
    </div>
  );
}
