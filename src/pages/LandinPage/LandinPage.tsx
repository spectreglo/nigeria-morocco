import CarouselItem from "./components/CarouselItem";
import { Carousel } from "react-responsive-carousel";
import ProgramItems from "./components/ProgramItems";
import {
  Button,
  Modal,
  message,
  Divider,
  Dropdown,
  Space,
  MenuProps,
} from "antd";
import Footer from "./components/Footer";
import { useState } from "react";
import PhoneInput from "./components/PhoneInput";
import { useNavigate } from "react-router-dom";
import MenuIcon from "./components/MenuIcon";

import { Drawer } from "antd";
import { useTranslation } from "react-i18next";
import GlobeIcon from "../../components/GlobeIcon";

interface ItemType {
  left: React.ReactNode;
  right?: React.ReactNode;
}
export default function LandinPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [value, setValue] = useState("+234");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // useEffect(() => {
  //   i18n.changeLanguage(curretLanguage);
  // }, []);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          English 🇬🇧
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            i18n.changeLanguage("fr");
          }}
        >
          French 🇫🇷
        </span>
      ),
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
    onClose();
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
          <h1 className="text-5xl md:text-6xl text-left font-bold text-primary">
            {t("businessweek")}
          </h1>
          <h2 className="mt-6 text-left">{t("edition")}</h2>
          <span className="my-6 text-left">{t("oct")}</span>
          <Button
            onClick={showModal}
            className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black"
          >
            {i18n?.language === "fr"
              ? "Obtenez Votre Badge"
              : `${t("Participate")}`}
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
            {t("slide2Head")}
          </h1>
          {/* <h1 className="text-5xl md:text-6xl text-left font-bold  text-white">
            Morocco
          </h1> */}

          <span className="my-6 text-left text-white">{t("slide2Body")}</span>
        </div>
      ),
    },
    {
      left: (
        <div className="flex w-100% flex-col md:w-4/6">
          <h1 className="text-5xl md:text-6xl text-left font-bold text-white">
            {t("slide3Head")}
          </h1>
          {/* <h1 className="text-5xl md:text-6xl text-left font-bold  text-white">
            Morocco
          </h1> */}

          <span className="my-6 text-left text-white">{t("slide3Body")}</span>
        </div>
      ),
    },
    {
      left: (
        <div className="flex w-100% flex-col md:w-4/6">
          <h1 className="text-5xl md:text-6xl text-left font-bold text-white">
            Nigeria-Morocco Business Week 2024
          </h1>
          {/* <h1 className="text-5xl md:text-6xl text-left font-bold  text-white">
            Morocco
          </h1> */}

          {/* <span className="my-6 text-left text-white">{t("slide3Body")}</span> */}
        </div>
      ),
    },
    {
      left: (
        <div className="flex w-100% flex-col md:w-4/6">
          <h1 className="text-5xl md:text-6xl text-left font-bold text-white">
            Nigeria-Morocco Business Week 2024
          </h1>
          {/* <h1 className="text-5xl md:text-6xl text-left font-bold  text-white">
            Morocco
          </h1> */}

          {/* <span className="my-6 text-left text-white">{t("slide3Body")}</span> */}
        </div>
      ),
    },
    {
      left: (
        <div className="flex w-100% flex-col md:w-4/6">
          <h1 className="text-5xl md:text-6xl text-left font-bold text-white">
            Nigeria-Morocco Business Week 2024
          </h1>
          {/* <h1 className="text-5xl md:text-6xl text-left font-bold  text-white">
            Morocco
          </h1> */}

          {/* <span className="my-6 text-left text-white">{t("slide3Body")}</span> */}
        </div>
      ),
    },
  ];
  const isSmallSize = window.innerWidth < 100;
  const conditionalItem = isSmallSize ? ITEMS.slice(0, 1) : ITEMS;
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <div className="min-h-screen bg-white flex flex-col">
        <div className="nav px-5 md:px-20 lg:px-40  min-h-20 p-0  bg-silver flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">
            🇳🇬 NIGERIA-MOROCCO 🇲🇦
          </h1>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-[12px]" href="/">
              {t("Home")}
            </a>
            <a className="text-[12px]" href="#partners">
              {t("Sponsors")}
            </a>
            {i18n?.language === "fr" ? (
              <>
                <Button
                  type="primary"
                  ghost
                  onClick={(e) => {
                    e.preventDefault();
                    setBookingModalOpen(true);
                  }}
                  className="h-[40px]"
                >
                  Obtenez Votre Stand/Espace
                </Button>
                <Button
                  onClick={showModal}
                  className="bg-primary h-[40px] text-white"
                >
                  Obtenez Votre Badge
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  ghost
                  onClick={(e) => {
                    e.preventDefault();
                    setBookingModalOpen(true);
                  }}
                  className="h-[40px]"
                >
                  {t("bookButtton")}
                </Button>
                <Button
                  onClick={showModal}
                  className="bg-primary w-[115px] h-[40px] text-white"
                >
                  {t("Participate")}
                </Button>
              </>
            )}

            <Dropdown menu={{ items }}>
              <a
                className=" cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <p className="text-[10px]">
                    {i18n.language == "en"
                      ? "English Language"
                      : "French Language"}
                  </p>
                  <GlobeIcon />
                </Space>
              </a>
            </Dropdown>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Dropdown menu={{ items }}>
              <a
                className=" cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <GlobeIcon />
              </a>
            </Dropdown>

            <div onClick={showDrawer}>
              <MenuIcon />
            </div>
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
          className="flex flex-col w-full min-h-[50vh] md:min-h-[80vh] justify-start text-start"
        >
          {conditionalItem.map((item, ind) => (
            <CarouselItem key={ind} item={item} ind={ind} />
          ))}
        </Carousel>
      </div>

      {/* END OF HERO SECTION */}

      {/* OUR PARTNERS */}
      <div id="partners" className="flex flex-col items-center p-10">
        <h1 className="text-2xl text-fontColor font-[600]">{t("Partners")}</h1>

        <div className="grid  place-items-center px-0 grid-cols-2 md:grid-cols-6 gap-5 w-full md:px-32 mt-10">
          {/* <img src="nec.png" alt="nec" /> */}
          <img src="cciscs.jpg" alt="coc" />
          <img src="Embassy.png" alt="embassy" />
          <img src="ram.png" alt="air maroc" />
          <img src="fmiti.png" alt="fmiti" />
          <img src="HIESL.png" alt="highland" />
          <img src="jed.jpg" alt="JED" />
          <img src="jig.jpeg" alt="Jigawa" />
          {/* <img src="niger.png" alt="niger" /> */}
          <img src="farmcreed.jpg" alt="farm creed" />
          <img src="MSD.jpg" alt="steel" />
          <img src="NADDC.png" alt="coc" />
          <img src="ridec.png" alt="Ridec" />
        </div>
      </div>

      {/* OUR PROGRAMS */}

      <div className="flex flex-col items-center bg-silver p-10">
        <h1 className="text-2xl text-fontColor font-[600]">
          {t("sectorHeading")}
        </h1>
        <p className="my-5 text-center text-fontColor">{t("sectorBody")}</p>
        <div className="grid place-items-center px-0 grid-cols-1 md:grid-cols-3 gap-5 w-full md:px-5 lg:px-32 mt-10">
          <ProgramItems
            icon="agric.png"
            title={t("agricProducts")}
            content=""
          />
          <ProgramItems
            title={t("automobile")}
            content=""
            icon="automobile.png"
          />
          <ProgramItems icon="energy.jpg" title={t("renewable")} content="" />
          <ProgramItems icon="minerals.jpg" title={t("minerals")} content="" />
          <ProgramItems icon="digital.jpeg" title={t("economy")} content="" />
          <ProgramItems
            icon="e-government.png"
            title={t("banking")}
            content=""
          />
        </div>
      </div>

      {/* Space Booking */}
      <div
        id="space"
        className="flex bg-silver min-h-[308px] justify-center flex-col md:flex-row md:justify-between  items-center w-full py-5 px-5  md:px-20 gap-5 md:gap-10 lg:px-40"
      >
        <div className="gap-4">
          <h1 className="text-4xl font-bold">
            {t("exhibitionHead")}{" "}
            <span className="text-primary text-4xl font-bold">
              {t("exhibitionSpace")}?
            </span>
          </h1>
          <p className="text-left text-fontColor mt-2">{t("exhibitionBody")}</p>
        </div>

        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-20">
          <Button
            onClick={() => setBookingModalOpen(true)}
            className="bg-primary w-[100%] mt-4 md:min-w-[200px] h-12 text-white hover:bg-black"
          >
            {i18n?.language === "fr"
              ? "Obtenez Votre Stand/Espace"
              : `${t("bookButtton")}`}
          </Button>
        </div>
      </div>

      {/* ABOUT US */}

      <div className="flex flex-col md:flex-row justify-between my-10 items-center w-full px-5  md:px-20  gap-10 lg:px-40">
        <img src="bweek.jpg" className="w-full md:w-1/2" />

        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl  font-bold text-fontColor">
            {t("newsHeader1")}
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            <p>{t("newsBody1")}</p>{" "}
            <p className="my-3">
              <b>{t("venue")}:</b> Lagos, Kano and Abuja (Nigeria).
            </p>{" "}
            {t("news1Body2")}
            <br />
            {t("news1Body3")}
          </p>
          <Button className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black">
            {t("learn")}
          </Button>
        </div>
      </div>

      <div className="w-full px-5 md:px-20">
        <Divider
          style={{
            borderColor: "#e9e9e9",
          }}
        />
      </div>
      {/* NEWS */}

      <div className="flex flex-col md:flex-row justify-between my-10 items-center w-full px-5  md:px-20  gap-10 lg:px-40">
        <img src="lagos.jpg" alt="lagos" className="w-full md:w-1/2" />

        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-fontColor">
            {t("newsHeader2")}
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            {t("newsBody2")}
          </p>
          <Button className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black">
            <a target="_blank" href="https://spectretranstradeglobal.com">
              {t("learn")}
            </a>
          </Button>
        </div>
      </div>
      <div className="w-full px-5 md:px-20">
        <Divider
          style={{
            borderColor: "#e9e9e9",
          }}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between my-10 items-center w-full px-5  md:px-20  gap-10 lg:px-40">
        <img src="kano.webp" alt="kano" className="w-full md:w-1/2" />

        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-fontColor">
            {t("newsHeader3")}
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            {t("newsBody3")}
          </p>
          <Button className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black">
            <a target="_blank" href="https://spectretranstradeglobal.com">
              {t("learn")}
            </a>
          </Button>
        </div>
      </div>
      <div className="w-full px-5 md:px-20">
        <Divider
          style={{
            borderColor: "#e9e9e9",
          }}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between my-10 items-center w-full px-5  md:px-20  gap-10 lg:px-40">
        <img src="abuja.jpg" alt="abuja" className="w-full md:w-1/2" />

        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-fontColor">
            {t("newsHeader4")}
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            {t("newsBody4")}
          </p>
          <Button className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black">
            <a target="_blank" href="https://spectretranstradeglobal.com">
              {t("learn")}
            </a>
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
        onCancel={handleCancel}
      >
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
            <Button onClick={handleCancel} className="h-[40px]">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (phone && value) {
                  navigate("Register", {
                    state: { phoneNumber: value + phone },
                  });
                } else {
                  message.warning("Phone number is required");
                }
              }}
              className="bg-primary h-[40px]"
              type="primary"
            >
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
        onCancel={() => setBookingModalOpen(false)}
      >
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
                  navigate("Booking", {
                    state: { phoneNumber: value + phone },
                  });
                } else {
                  message.warning("Phone number is required");
                }
              }}
              className="bg-primary h-[40px]"
              type="primary"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <Drawer title="Menu" onClose={onClose} open={open}>
        <div className="flex flex-col items-center gap-[20px]">
          <a
            onClick={onClose}
            className="text-[14px]  w-full text-center"
            href="/"
          >
            {t("Home")}
          </a>
          <a
            onClick={onClose}
            className="text-[14px] w-full text-center"
            href="#partners"
          >
            {t("Sponsors")}
          </a>
          {i18n?.language === "fr" ? (
            <>
              <Button
                type="primary"
                ghost
                onClick={(e) => {
                  e.preventDefault();
                  setBookingModalOpen(true);
                }}
                className="w-full h-[40px]"
              >
                Obtenez Votre Stand/Espace
              </Button>
              <Button
                onClick={showModal}
                className="bg-primary w-full h-[40px] text-white"
              >
                Obtenez Votre Badge
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                ghost
                onClick={(e) => {
                  e.preventDefault();
                  setBookingModalOpen(true);
                }}
                className="w-full h-[40px]"
              >
                Book A Space
              </Button>
              <Button
                onClick={showModal}
                className="bg-primary w-full h-[40px] text-white"
              >
                Participate
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
}
