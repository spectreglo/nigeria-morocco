export default function DashboardCard({
  color,
  value = '',
  label = '',
  label2 = '',
  value2 = '',
}: {
  color: string;
  value: string;
  label: string;
  label2?: string;
  value2?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="h-[80px] w-full md:w-[227px] flex  px-4 rounded text-white items-center justify-between">
      <div>
        <h1 className="font-bold">{value}</h1>
        <p className="text-[12px]">{label}</p>
      </div>
      {label2 && (
        <div>
          <h1 className="font-bold">{value2}</h1>
          <p className="text-[12px]">{label2}</p>
        </div>
      )}
    </div>
  );
}
