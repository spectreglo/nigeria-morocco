import CarouselItem from './componets/CarouselItem';
import { Carousel } from 'react-responsive-carousel';
import ProgramItems from './componets/ProgramItems';
import { Button, Modal, message } from 'antd';
import Footer from './componets/Footer';
import { useState } from 'react';
import PhoneInput from './componets/PhoneInput';
import { Link, useNavigate } from 'react-router-dom';
interface ItemType {
  left: React.ReactNode;
  right?: React.ReactNode;
}
export default function LandinPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [value, setValue] = useState('+234');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const ITEMS: ItemType[] = [
    {
      left: (
        <div className="flex w-100% flex-col md:w-4/6">
          <h1 className="text-5xl md:text-6xl text-left font-bold">
            🇳🇬 NIGERIA-MOROCCO 🇲🇦
          </h1>
          <h1 className="text-5xl md:text-6xl text-left font-bold text-lightGreen">
            Business Week Casablanca, Morocco
          </h1>
          <h2 className="mt-6 text-left">1st Edition</h2>
          <span className="my-6 text-left">May 27th-29th, 2024</span>
          <Button
            onClick={showModal}
            className="bg-lightGreen w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black">
            Participate
          </Button>
        </div>
      ),
      right: (
        <div className="flex-1">
          <img src="nig.png" />
        </div>
      ),
    },
    {
      left: (
        <div className="flex w-100% flex-col md:w-4/6">
          <h1 className="text-5xl md:text-6xl text-left font-bold text-white">
            Noor Solar Power Plant
          </h1>
          <h1 className="text-5xl md:text-6xl text-left font-bold  text-white">
            Morocco
          </h1>

          <span className="my-6 text-left text-white">
            The Noor solar plant is a flagship project launched under the
            ambitious energy policy of the Moroccan Kingdom. It is located in
            the municipality of Ghessate, in the Southern province of
            Ouarzazate.
          </span>
        </div>
      ),
    },
    {
      left: (
        <div className="flex w-100% flex-col md:w-4/6">
          <h1 className="text-5xl md:text-6xl text-left font-bold text-white">
            Agriculture in
          </h1>
          <h1 className="text-5xl md:text-6xl text-left font-bold  text-white">
            Morocco
          </h1>

          <span className="my-6 text-left text-white">
            Moroccan agriculture operates through a mixed and integrated
            crop/livestock system, representing the main source of income for
            the majority of rural households.
          </span>
        </div>
      ),
    },
  ];
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <div className="min-h-screen bg-silver flex flex-col">
        <div className="nav px-5 md:px-20 lg:px-40  min-h-20 p-0  bg-silver flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">
            🇳🇬 NIGERIA-MOROCCO 🇲🇦
          </h1>
          <div className="hidden md:flex items-center space-x-10">
            <a className="text-[12px]" href="/">
              Home
            </a>
            <a className="text-[12px]" href="/">
              Our Sponsors
            </a>

            <a
              onClick={(e) => {
                e.preventDefault();
                setBookingModalOpen(true);
              }}
              className="text-[12px]"
              href="/">
              Book A Space
            </a>
            <Button
              onClick={showModal}
              className="bg-lightGreen w-[115px] h-[40px]   text-white">
              Participate
            </Button>
            <Link to="/dashboard">
              <Button
                onClick={showModal}
                className="bg-silver w-[115px] h-[40px]   text-black">
                Admin
              </Button>
            </Link>
          </div>
        </div>
        <Carousel
          swipeable={false}
          showStatus={false}
          stopOnHover={false}
          interval={4000}
          autoPlay
          showArrows={false}
          infiniteLoop
          className="flex flex-col w-full min-h-[50vh] md:min-h-[80vh] justify-start text-start">
          {ITEMS.map((item, ind) => (
            <CarouselItem key={ind} item={item} ind={ind} />
          ))}
        </Carousel>
      </div>

      {/* END OF HERO SECTION */}

      {/* OUR PARTNERS */}
      <div className="flex flex-col items-center p-10">
        <h1 className="text-2xl text-fontColor font-[600]">Our Partners</h1>

        <div className="grid  place-items-center px-0 grid-cols-2 md:grid-cols-6 gap-5 w-full md:px-32 mt-10">
          <span />
          <span />
          <img src="Embassy.png" />
          <img src="ram.png" />
          <span />
          <span />
        </div>
      </div>

      {/* OUR PROGRAMS */}

      <div className="flex flex-col items-center p-10">
        <h1 className="text-2xl text-fontColor font-[600]">
          Multi-sectoral Programme
        </h1>
        <p className="my-5 text-center text-fontColor">
          The programme is designed to be multi-sectoral with particular focus
          in some areas
        </p>
        <div className="grid  place-items-center px-0 grid-cols-1 md:grid-cols-3 gap-5 w-full md:px-5 lg:px-32 mt-10">
          <ProgramItems
            icon="tract.svg"
            title="Agriculture & Agro-allied Products"
            content=""
          />
          <ProgramItems title="Automobile" content="" icon="car.svg" />
          <ProgramItems
            icon="renergy.svg"
            title="Electricity & Renewable Energy"
            content=""
          />
          <ProgramItems
            icon="rock.svg"
            title="Solid Minerals/Steel"
            content=""
          />
          <ProgramItems icon="economy.svg" title="Digital Economy" content="" />
          <ProgramItems
            icon="bank.svg"
            title="Banking & E-Government"
            content=""
          />
        </div>
      </div>

      {/* ABOUT US */}

      <div className="flex flex-col md:flex-row justify-between my-10 items-center w-full px-5  md:px-20  gap-10 lg:px-40">
        <img src="start.png" className="w-full md:w-1/2" />

        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl  font-bold text-fontColor">
            Promoting Commercial Trade/Exchange Between Nigeria and Morocco
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            <p>
              We invite you to participate in the 1st Edition of the
              Nigeria-Morocco Business Week, scheduled for the 27th to 29th May,
              2024.
            </p>{' '}
            <p className="my-3">
              <b>Venue:</b> OFEC Casablanca, Morocco.
            </p>{' '}
            The event is organized by The Coalition of Northern States Chambers
            of Commerce, Industry, Agriculture and Mines (CONSCCIMA) in
            conjunction with Spectre Trans-Trade Global of Morocco. <br />
            The event is aimed at boosting the Exportation of Agricultural
            products of Nigeria and other Minerals like Steel & Lithium to the
            Kingdom Of Morocco and beyond, thereby strategically placing Nigeria
            as an alternative source of raw materials for the Kingdom of
            Morocco. <br />
            The event is expected to host individual Participants, Exhibitors
            from across all sectors, including industrial Experts, Captains of
            Industry, Government agencies/ Ministries of both Nigeria and
            Morocco.
          </p>
          <Button className="bg-lightGreen w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black">
            Learn More
          </Button>
        </div>
      </div>

      {/* Space Booking */}
      <div className="flex bg-silver  min-h-[308px] justify-center flex-col md:flex-row md:justify-between  items-center w-full py-5 px-5  md:px-20 gap-5 md:gap-10 lg:px-40">
        <div className="gap-4">
          <h1 className="text-4xl font-bold">
            Want an{' '}
            <span className="text-lightGreen text-4xl font-bold">
              Exhibition space?
            </span>
          </h1>
          <p className="text-left text-fontColor mt-2">
            We reached here with our hard work and dedication
          </p>
        </div>

        <div className="grid grid-cols-2 gap-20">
          <Button
            onClick={() => setBookingModalOpen(true)}
            className="bg-lightGreen w-[100%] mt-4 md:w-[200px] h-12 text-white hover:bg-black">
            Book A Space
          </Button>
        </div>
      </div>
      <Footer />

      <Modal
        footer={false}
        centered
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div className="flex flex-col min-h-[400px] bg-white justify-center items-center">
          <img src="phone.png" className="mt-[auto]" />
          <h1 className="font-bold mt-5">Enter Your Phone Number</h1>
          <PhoneInput
            phone={phone}
            value={value}
            setPhone={setPhone}
            setValue={setValue}
          />

          <div className="mt-[auto] ml-[auto] flex gap-4">
            <Button className="h-[40px]">Cancel</Button>
            <Button
              onClick={() => {
                if (phone && value) {
                  navigate('Register', {
                    state: { phoneNumber: value + phone },
                  });
                } else {
                  message.warning('Phone number is required');
                }
              }}
              className="bg-lightGreen h-[40px]"
              type="primary">
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        footer={false}
        centered
        title=""
        open={bookingModalOpen}
        onOk={() => setBookingModalOpen(false)}
        onCancel={() => setBookingModalOpen(false)}>
        <div className="flex flex-col min-h-[400px] bg-white justify-center items-center">
          <img src="phone.png" className="mt-[auto]" />
          <h1 className="font-bold mt-5">Enter Your Phone Number</h1>
          <PhoneInput
            phone={phone}
            value={value}
            setPhone={setPhone}
            setValue={setValue}
          />

          <div className="mt-[auto] ml-[auto] flex gap-4">
            <Button className="h-[40px]">Cancel</Button>
            <Button
              onClick={() => {
                if (phone && value) {
                  navigate('Booking', {
                    state: { phoneNumber: value + phone },
                  });
                } else {
                  message.warning('Phone number is required');
                }
              }}
              className="bg-lightGreen h-[40px]"
              type="primary">
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
