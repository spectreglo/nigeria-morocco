import { Button } from 'antd';

export default function CarouselItem({ openModal }: { openModal: () => void }) {
  return (
    <div className="flex w-full  px-5 flex-col min-h-[50vh] md:min-h-[80vh]  justify-start md:flex-row md:justify-between items-center  flex-1 bg-silver md:px-20 lg:px-40">
      <div className="flex w-100% flex-col md:w-4/6">
        <h1 className="text-5xl md:text-6xl text-left font-bold">
          🇳🇬 NIGERIA-MOROCCO 🇲🇦
        </h1>
        <h1 className="text-5xl md:text-6xl text-left font-bold text-lightGreen">
          Business Week Casablanca, Morocco
        </h1>
        <span className="my-6 text-left">May 27-29, 2024</span>
        <Button
          onClick={openModal}
          className="bg-lightGreen w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black">
          Participate
        </Button>
      </div>
      <div className="flex-1">
        <img src="nig.png" />
      </div>
    </div>
  );
}
