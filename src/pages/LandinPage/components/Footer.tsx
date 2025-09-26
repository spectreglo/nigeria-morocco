import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[344px] bg-lightBlack text-white py-10 flex flex-col-reverse md:flex-row md:justify-between  px-5 md:px-20 lg:px-40 gap-10">
      <div className="flex flex-col gap-5 w-[40%]">
        <h1 className="font-bold text-3xl">Nigeria-Morocco</h1>
        <p className="text-[13px]">{t("copyright")}</p>
        <p className="text-[13px]">{t("rights")}</p>

        <div className="flex items-center mt-[auto]">
          <div className="bg-[rgba(255,255,255,0.2)] w-[32px] h-[32px] rounded-full flex items-center mr-2 justify-center">
            <i className="fa-brands fa-youtube"></i>
          </div>

          <div className="bg-[rgba(255,255,255,0.2)] w-[32px] h-[32px] rounded-full flex items-center mr-2 justify-center">
            <i className="fa-brands fa-x-twitter"></i>
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-10 flex-1">
        {/* <div className="gap-2 flex flex-col">
          <h1 className="font-bold mb-2 md:mb-8">{t("links")}</h1>
          <span className="text-[13px]">Register Now</span>
          <span className="text-[13px]">Terms of service</span>
          <span className="text-[13px]">Contact Us</span>
        </div> */}

        <div className="gap-2 flex flex-col">
          <h1 className="font-bold mb-2 md:mb-8">{t("follow")}</h1>
          <span className="text-[13px]">
            <i className="fa-brands fa-facebook text-[24px] mr-2" />
            Facebook
          </span>
          <span className="text-[13px]">
            <i className="fa-brands fa-instagram text-[24px] mr-2" />
            Instagram
          </span>
          <span className="text-[13px]">
            <i className="fa-brands fa-linkedin text-[24px] mr-2" />
            LinkedIn
          </span>
          {/* <span className="text-[13px]">
            <i className="fa-brands fa-youtube text-[24px] mr-2" />
            YouTube
          </span> */}
        </div>

        <div className="gap-2 flex flex-col w-[120%]">
          <h1 className="font-bold mb-2 md:mb-8">Infos</h1>
          <span className="text-[13px]">
            <i className="fa-solid fa-location-dot mr-2" />
            Lagos, Kano and Abuja (Nigeria)
          </span>
          <span className="text-[13px]">
            <i className="fa-solid fa-calendar mr-2" />
            8th - 11th December 2025
          </span>
          <span className="text-[13px]">
            <i className="fa-solid fa-clock mr-2" />
            From 08h00 to 19h00
          </span>
          <span className="text-[13px]">
            <i className="fa-solid fa-envelope mr-2" />
            info@nigeria-moroccobusinessweek.com
          </span>
        </div>
      </div>
    </div>
  );
}
