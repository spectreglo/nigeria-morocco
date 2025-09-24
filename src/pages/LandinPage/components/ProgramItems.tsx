export default function ProgramItems({ title = "", content = "", icon = "" }) {
  return (
    // <div className="h-[224px] w-full flex flex-col items-center gap-4 justify-center shadow">
    //   <img src={icon} />
    //   <h1 className="text-2xl text-fontColor font-bold">{title}</h1>
    //   <p className="text-center text-fontColor text-[13px]">{content}</p>
    // </div>

    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
      <div>
        <img
          className="object-center object-cover h-auto w-full"
          src={icon}
          alt="photo"
        />
      </div>
      <div className="text-center py-8 sm:py-6">
        <p className="text-xl text-gray-700 font-bold mb-2">{title}</p>
        <p className="text-base text-gray-400 font-normal">{content}</p>
      </div>
    </div>
    // </div>
  );
}
