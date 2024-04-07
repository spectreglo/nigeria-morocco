import CarouselItem from './componets/CarouselItem';
import { Carousel } from 'react-responsive-carousel';
import ProgramItems from './componets/ProgramItems';
import { Button, Modal, message } from 'antd';
import Footer from './componets/Footer';
import { useState } from 'react';
import PhoneInput from './componets/PhoneInput';
import { Link, useNavigate } from 'react-router-dom';

export default function LandinPage() {
  const ITEMS = ['SLIDE', 'SLIDE2', 'SLIDE3'];
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

            <a className="text-[12px]" href="/">
              Exhibitors
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
          {ITEMS.map((item) => (
            <CarouselItem openModal={showModal} key={item} />
          ))}
        </Carousel>
      </div>

      {/* END OF HERO SECTION */}

      {/* OUR PARTNERS */}
      <div className="flex flex-col items-center p-10">
        <h1 className="text-2xl text-fontColor font-[600]">Our Partners</h1>
        <p className="my-5 text-center text-fontColor">
          We have been working with some biggest companies
        </p>
        <div className="grid  place-items-center px-0 grid-cols-2 md:grid-cols-6 gap-5 w-full md:px-32 mt-10">
          <img src="sponsor.png" />
          <img src="Logo.png" />
          <img src="sponsor.png" />
          <img src="sponsor.png" />
          <img src="sponsor.png" />
          <img src="sponsor.png" />
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
            icon="com.png"
            title="Agriculture & Agro-allied Products"
            content=""
          />
          <ProgramItems title="Automobile" content="" icon="Icon.png" />
          <ProgramItems icon="energy.png" title="Renewable Energy" content="" />
          <ProgramItems icon="com.png" title="Solid Mineral" content="" />
          <ProgramItems icon="com.png" title="Digital Economy" content="" />
          <ProgramItems
            icon="com.png"
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
            We invite you to participate at the 1st Edition of the
            Nigeria-Morocco Business Week, scheduled to take place at the
            Exhibition Parks and Economic Zones in Casablanca, Morocco from May
            27-29, 2024. The event, which is to be organized by Coalition of
            Northern States Chambers of Commerce, Industry, and Agriculture
            (CONSCCIMA) and Spectre Trans-Trade Global is aimed at boosting the
            Agricultural potentials of Northern Nigeria and the Country at large
            through export and improved yield in the Kingdom of Morocco is
            expected to host individual Participants and Exhibitors from
            Nigeria.
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
            className="bg-lightGreen w-1/2 mt-4 md:w-[200px] h-12 text-white hover:bg-black">
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
