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
import { useState, useEffect, useRef } from "react";
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
  const [eventCountdown, setEventCountdown] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const eventDate = new Date("2025-12-08T09:00:00"); // Example event date
  const scrollRef = useRef<HTMLDivElement>(null);

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
        <div className="flex w-full flex-col md:w-4/6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl text-left font-bold drop-shadow-lg animate-slide-down">
            🇳🇬 NIGERIA-MOROCCO 🇲🇦
          </h1>
          <h1 className="text-5xl md:text-6xl text-left font-bold text-primary drop-shadow-lg animate-slide-up">
            {t("businessweek")}
          </h1>
          <h2 className="mt-6 text-left text-black/90 text-2xl animate-fade-in-delay">
            {t("edition")}
          </h2>
          <span className="my-6 text-left text-black/80 animate-fade-in-delay2">
            {t("oct")}
          </span>
          {/* <Button
            onClick={showModal}
            className="bg-gradient-to-r from-primary to-blue-500 w-1/2 mt-4 md:w-1/3 h-12 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-black hover:to-primary transition-all duration-200 animate-fade-in-delay3"
          >
            {i18n?.language === "fr"
              ? "Obtenez Votre Badge"
              : `${t("Participate")}`}
          </Button> */}

          <div className="flex gap-4 mt-4">
            <Button
              onClick={showModal}
              className="bg-gradient-to-r from-primary to-blue-500 w-[180px] h-12 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-black hover:to-primary transition-all duration-200"
            >
              {i18n?.language === "fr"
                ? "Obtenez Votre Badge"
                : `${t("Participate")}`}
            </Button>
            <Button
              onClick={() =>
                scrollRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white border border-primary text-primary w-[180px] h-12 font-semibold rounded-lg shadow hover:bg-primary hover:text-white transition-all duration-200"
            >
              {t("learn")}
            </Button>
          </div>
        </div>
      ),
      right: (
        <div className="flex-1 flex items-center justify-center animate-fade-in-delay2">
          <img
            src="nig.png"
            // className="w-[80%] max-w-[400px] rounded-2xl shadow-xl border-4 border-white/30"
          />
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
  // const isSmallSize = window.innerWidth < 100;
  // const conditionalItem = isSmallSize ? ITEMS.slice(0, 1) : ITEMS;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      if (diff <= 0) {
        setEventCountdown("Event Started!");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setEventCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/80 via-blue-100 to-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col relative">
        {/* Countdown Timer (hidden on mobile) */}
        <div className="hidden md:flex absolute top-24 left-1/2 -translate-x-1/2 z-20 flex-col items-center">
          <div className="bg-white/80 px-6 py-2 rounded-full shadow text-primary font-bold text-lg border border-primary animate-fade-in">
            {eventCountdown && <span>Event Starts In: {eventCountdown}</span>}
          </div>
        </div>
        <div className="nav sticky top-0 z-30 px-5 md:px-20 lg:px-40 min-h-20 p-0 bg-silver/90 backdrop-blur-md shadow-md flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-primary drop-shadow">
            🇳🇬 NIGERIA-MOROCCO 🇲🇦
          </h1>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-[12px] hover:text-primary transition" href="/">
              {t("Home")}
            </a>
            <a
              className="text-[12px] hover:text-primary transition"
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
                  className="h-[40px] hover:scale-105 transition"
                >
                  Obtenez Votre Stand/Espace
                </Button>
                <Button
                  onClick={showModal}
                  className="bg-primary h-[40px] text-white hover:scale-105 transition"
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
                  className="h-[40px] hover:scale-105 transition"
                >
                  {t("bookButtton")}
                </Button>
                <Button
                  onClick={showModal}
                  className="bg-primary w-[115px] h-[40px] text-white hover:scale-105 transition"
                >
                  {t("Participate")}
                </Button>
              </>
            )}
            <Dropdown menu={{ items }}>
              <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
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
              <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
                <GlobeIcon />
              </a>
            </Dropdown>
            <div onClick={showDrawer}>
              <MenuIcon />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient from-primary/80 via-blue-900/30 to-transparent z-0 pointer-events-none" />
        <Carousel
          swipeable={false}
          showStatus={false}
          stopOnHover={false}
          interval={4000}
          autoPlay
          showArrows={false}
          infiniteLoop
          className="flex flex-col w-full min-h-[50vh] md:min-h-[80vh] justify-start text-start z-10"
        >
          {(window.innerWidth < 768 ? ITEMS.slice(0, 1) : ITEMS).map(
            (item, ind) => (
              <CarouselItem key={ind} item={item} ind={ind} />
            )
          )}
        </Carousel>
        {/* Hero Section CTAs */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
          <button
            onClick={() =>
              scrollRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center animate-bounce cursor-pointer group"
            aria-label="Scroll Down"
          >
            <span className="text-white text-xs mb-1 group-hover:text-primary transition">
              Scroll Down
            </span>
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-white group-hover:text-primary transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {/* <div className="flex gap-4 mt-4">
            <Button
              onClick={showModal}
              className="bg-gradient-to-r from-primary to-blue-500 w-36 h-12 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-black hover:to-primary transition-all duration-200"
            >
              {i18n?.language === "fr"
                ? "Obtenez Votre Badge"
                : `${t("Participate")}`}
            </Button>
            <Button
              onClick={() =>
                scrollRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white border border-primary text-primary w-36 h-12 font-semibold rounded-lg shadow hover:bg-primary hover:text-white transition-all duration-200"
            >
              {t("learn")}
            </Button>
          </div> */}
        </div>
      </div>
      {/* END OF HERO SECTION */}
      {/* OUR PARTNERS */}
      <div
        ref={scrollRef}
        id="partners"
        className="flex flex-col items-center p-10 pb-20 bg-gradient-to-br from-white via-blue-50 to-silver/30 rounded-2xl shadow-lg mx-2 md:mx-20 my-10"
      >
        <h1 className="text-2xl text-fontColor font-[700] mb-6 tracking-wide uppercase letter-spacing-2">
          {t("Partners")}
        </h1>
        <p className="uppercase text-primary font-semibold mb-2 text-center text-sm md:text-base tracking-wider">
          Under the Auspices of the Nigeria Embassy Rabat
        </p>
        <div className="flex justify-center items-center mb-6 w-full">
          <img
            key={"Embassy.png"}
            src={"Embassy.png"}
            alt={"Embassy"}
            className="rounded-2xl shadow-xl bg-white/90 p-3 border-4 border-primary hover:scale-105 hover:shadow-xl mx-auto block"
            style={{
              maxHeight: 180,
              maxWidth: 420,
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <p className="uppercase text-red-700 font-semibold mt-2 mb-2 text-center text-sm md:text-base tracking-wider">
          Official Partner Agro Industry
        </p>
        <div className="grid place-items-center justify-center items-center grid-cols-2 md:grid-cols-1 gap-2 w-full md:w-[70%] md:px-32 mt-2 mb-6">
          {["fenagri.png"].map((src) => (
            <img
              key={src}
              src={src}
              alt={src.split(".")[0]}
              className="rounded-xl shadow-lg bg-white/90 p-3 border-2 border-blue-200 hover:scale-105 hover:shadow-xl transition-all duration-200 mx-auto block"
              style={{
                maxHeight: 120,
                maxWidth: 380,
                width: "100%",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
        <p className="uppercase text-blue-700 font-semibold mt-2 mb-2 text-center text-sm md:text-base tracking-wider">
          In partnership with
        </p>
        <div className="grid place-items-center justify-center items-center grid-cols-2 md:grid-cols-1 gap-2 w-full md:w-[70%] md:px-32 mt-2 mb-6">
          {["casa.png"].map((src) => (
            <img
              key={src}
              src={src}
              alt={src.split(".")[0]}
              className="rounded-xl shadow-lg bg-white/90 p-3 border-2 border-blue-200 hover:scale-105 hover:shadow-xl transition-all duration-200 mx-auto block"
              style={{
                maxHeight: 120,
                maxWidth: 380,
                width: "100%",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
        <p className="uppercase text-gray-700 font-semibold mt-2 mb-2 text-center text-sm md:text-base tracking-wider">
          Institutional Partners
        </p>
        <div className="grid place-items-center justify-center items-center grid-cols-2 md:grid-cols-3 gap-5 w-auto md:px-32 mt-2 mb-6">
          {["fmiti.png", "MSD.jpg", "NADDC.png"].map((src) => (
            <img
              key={src}
              src={src}
              alt={src.split(".")[0]}
              className="rounded-lg shadow-md bg-white/80 p-2 border border-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-200 mx-auto block"
              style={{
                maxHeight: 90,
                maxWidth: 220,
                width: "100%",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
        <p className="uppercase text-gray-700 font-semibold mt-2 mb-2 text-center text-sm md:text-base tracking-wider">
          Strategic Partners
        </p>
        <div className="grid place-items-center justify-center items-center grid-cols-2 md:grid-cols-4 gap-5 w-auto md:px-32 mt-2">
          {["ram.png", "HIESL.png", "jed.jpg", "farmcreed.jpg"].map((src) => (
            <img
              key={src}
              src={src}
              alt={src.split(".")[0]}
              className="rounded-lg shadow-md bg-white/80 p-2 border border-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-200 mx-auto block"
              style={{
                maxHeight: 90,
                maxWidth: 220,
                width: "100%",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      </div>
      {/* OUR PROGRAMS */}
      <div className="flex flex-col items-center bg-silver/60 p-10 py-20">
        <h1 className="text-2xl text-fontColor font-[600]">
          {t("sectorHeading")}
        </h1>
        <p className="my-5 text-center text-fontColor">{t("sectorBody")}</p>
        <div className="grid place-items-center px-0 grid-cols-1 md:grid-cols-3 gap-8 w-full md:px-5 lg:px-32 mt-10">
          <div className="hover:scale-105 hover:shadow-xl transition-all duration-200 bg-white/80 rounded-xl p-4">
            <ProgramItems
              icon="agric.png"
              title={t("agricProducts")}
              content=""
            />
          </div>
          <div className="hover:scale-105 hover:shadow-xl transition-all duration-200 bg-white/80 rounded-xl p-4">
            <ProgramItems
              title={t("automobile")}
              content=""
              icon="automobile.png"
            />
          </div>
          <div className="hover:scale-105 hover:shadow-xl transition-all duration-200 bg-white/80 rounded-xl p-4">
            <ProgramItems icon="energy.jpg" title={t("renewable")} content="" />
          </div>
          <div className="hover:scale-105 hover:shadow-xl transition-all duration-200 bg-white/80 rounded-xl p-4">
            <ProgramItems
              icon="minerals.jpg"
              title={t("minerals")}
              content=""
            />
          </div>
          <div className="hover:scale-105 hover:shadow-xl transition-all duration-200 bg-white/80 rounded-xl p-4">
            <ProgramItems icon="digital.jpeg" title={t("economy")} content="" />
          </div>
          <div className="hover:scale-105 hover:shadow-xl transition-all duration-200 bg-white/80 rounded-xl p-4">
            <ProgramItems
              icon="e-government.png"
              title={t("banking")}
              content=""
            />
          </div>
        </div>
      </div>
      {/* Space Booking */}
      <div
        id="space"
        className="flex bg-silver/80 min-h-[308px] justify-center flex-col md:flex-row md:justify-between items-center w-full py-5 px-5 md:px-20 gap-5 md:gap-10 lg:px-40 rounded-xl shadow-inner my-10"
      >
        <div className="gap-4">
          <h1 className="text-4xl font-bold text-primary drop-shadow">
            {t("exhibitionHead")}{" "}
            <span className="text-blue-700 text-4xl font-bold">
              {t("exhibitionSpace")}?{" "}
            </span>
          </h1>
          <p className="text-left text-fontColor mt-2">{t("exhibitionBody")}</p>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-20">
          <Button
            onClick={() => setBookingModalOpen(true)}
            className="bg-gradient-to-r from-primary to-blue-500 w-full mt-4 md:min-w-[200px] h-12 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-black hover:to-primary transition-all duration-200"
          >
            {i18n?.language === "fr"
              ? "Obtenez Votre Stand/Espace"
              : `${t("bookButtton")}`}
          </Button>
        </div>
      </div>
      {/* ABOUT US */}
      <div className="flex flex-col md:flex-row justify-between my-10 items-center w-full px-5 md:px-20 gap-10 lg:px-40">
        <img src="bweek.jpg" className="w-full md:w-1/2 rounded-xl shadow-lg" />
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-fontColor">
            {t("newsHeader1")}
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            <p>{t("newsBody1")}</p>
            <p className="my-3">
              <b>{t("venue")}:</b> Lagos, Kano and Abuja (Nigeria).
            </p>
            {t("news1Body2")}
            <br />
            {t("news1Body3")}
          </p>
          <Button className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black rounded-lg shadow-md hover:scale-105 transition">
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
        <img
          src="lagos.jpg"
          alt="lagos"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
        />
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-fontColor">
            {t("newsHeader2")}
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            {t("newsBody2")}
          </p>
          <Button className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black rounded-lg shadow-md hover:scale-105 transition">
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
        <img
          src="kano.webp"
          alt="kano"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
        />
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-fontColor">
            {t("newsHeader3")}
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            {t("newsBody3")}
          </p>
          <Button className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black rounded-lg shadow-md hover:scale-105 transition">
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
        <img
          src="abuja.jpg"
          alt="abuja"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
        />
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-fontColor">
            {t("newsHeader4")}
          </h1>
          <p className="text-justify text-[13px] text-fontColor">
            {t("newsBody4")}
          </p>
          <Button className="bg-primary w-1/2 mt-4 md:w-1/3 h-12 text-white hover:bg-black rounded-lg shadow-md hover:scale-105 transition">
            <a target="_blank" href="https://spectretranstradeglobal.com">
              {t("learn")}
            </a>
          </Button>
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="w-full flex flex-col items-center py-20 bg-silver/60">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {t("Testimonial")}
        </h2>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <img
              src="/default.png"
              alt="Testimonial 1"
              className="w-16 h-16 rounded-full mb-3"
            />
            <p className="text-gray-700 italic">{t("testimonial1")}</p>
            <span className="mt-2 font-semibold text-primary">
              Amina S., Lagos
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <img
              src="/default.png"
              alt="Testimonial 2"
              className="w-16 h-16 rounded-full mb-3"
            />
            <p className="text-gray-700 italic">{t("testimonial2")}</p>
            <span className="mt-2 font-semibold text-primary">
              Youssef M., Casablanca
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <img
              src="/default.png"
              alt="Testimonial 3"
              className="w-16 h-16 rounded-full mb-3"
            />
            <p className="text-gray-700 italic">{t("testimonial3")}</p>
            <span className="mt-2 font-semibold text-primary">
              Chinedu O., Abuja
            </span>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="w-full flex flex-col items-center py-20 bg-white/80">
        <h2 className="text-2xl font-bold text-primary mb-6">{t("FAQ")}</h2>
        <div className="w-full max-w-2xl">
          <details className="mb-4 border rounded-lg p-4 bg-silver/40">
            <summary className="font-semibold cursor-pointer">
              {t("faq1")}
            </summary>
            <p className="mt-2 text-gray-700">{t("faq1ans")}</p>
          </details>
          <details className="mb-4 border rounded-lg p-4 bg-silver/40">
            <summary className="font-semibold cursor-pointer">
              {t("faq2")}
            </summary>
            <p className="mt-2 text-gray-700">{t("faq2ans")}</p>
          </details>
          <details className="mb-4 border rounded-lg p-4 bg-silver/40">
            <summary className="font-semibold cursor-pointer">
              {t("faq3")}
            </summary>
            <p className="mt-2 text-gray-700">{t("faq3ans")}</p>
          </details>
          <details className="mb-4 border rounded-lg p-4 bg-silver/40">
            <summary className="font-semibold cursor-pointer">
              {t("faq4")}
            </summary>
            <p className="mt-2 text-gray-700">{t("faq4ans")}</p>
          </details>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/212649397662"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center animate-bounce"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.385L4 29l7.828-2.05A11.96 11.96 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.77 0-3.432-.46-4.872-1.26l-.348-.2-4.65 1.217 1.24-4.527-.226-.36A9.96 9.96 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.29-.145-1.71-.84-1.98-.935-.27-.1-.47-.145-.67.145-.19.29-.77.935-.94 1.125-.17.19-.35.21-.64.07-.29-.145-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.025-.51-.075-.145-.67-1.62-.92-2.22-.24-.58-.48.5-.67.51-.17.01-.36.01-.56.01-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.19 2.03 3.1 4.93 4.22.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z" />
        </svg>
      </a>
      {/* Footer */}
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
            <Button
              onClick={() => setBookingModalOpen(false)}
              className="h-[40px]"
            >
              Cancel
            </Button>
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
