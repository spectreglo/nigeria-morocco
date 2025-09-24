export default function NumberCards({ label = '', value = '', icon = '' }) {
  return (
    <div className="flex items-center gap-1">
      <img src={icon} />
      <div className="flex flex-col gap-1 ml-1">
        <h1 className="text-xl font-bold text-fontColor">{value}</h1>
        <p className="text-fontColor">{label}</p>
      </div>
    </div>
  );
}
