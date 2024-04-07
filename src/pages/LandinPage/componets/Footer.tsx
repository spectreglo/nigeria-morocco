import { Input } from 'antd';

export default function Footer() {
  return (
    <div className="min-h-[344px] bg-lightBlack text-white py-10 flex flex-col-reverse md:flex-row md:justify-between  px-5 md:px-20 lg:px-40 gap-10">
      <div className="flex flex-col gap-5 w-[40%]">
        <h1 className="font-bold text-3xl">Nigeria-Morocco</h1>
        <p className="text-[13px]">Copyright © 2024 Business Week</p>
        <p className="text-[13px]">All rights reserved</p>

        <div className="flex items-center mt-[auto]">
          <div className="bg-[rgba(255,255,255,0.2)] w-[32px] h-[32px] rounded-full flex items-center mr-2 justify-center">
            <img src="insta.svg" />
          </div>

          <div className="bg-[rgba(255,255,255,0.2)] w-[32px] h-[32px] rounded-full flex items-center mr-2 justify-center">
            <img src="insta.svg" />
          </div>

          <div className="bg-[rgba(255,255,255,0.2)] w-[32px] h-[32px] rounded-full flex items-center mr-2 justify-center">
            <img src="insta.svg" />
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-10 flex-1">
        <div className="gap-2 flex flex-col">
          <h1 className="font-bold mb-2 md:mb-8">Quick Links</h1>
          <span className="text-[13px]">Register Now</span>
          <span className="text-[13px]">Terms of service</span>
          <span className="text-[13px]">Contact Us</span>
        </div>

        <div className="gap-2 flex flex-col">
          <h1 className="font-bold mb-2 md:mb-8">Support</h1>
          <span className="text-[13px]">Register Now</span>
          <span className="text-[13px]">Terms of service</span>
          <span className="text-[13px]">Contact Us</span>
        </div>

        <div className="gap-2 flex flex-col">
          <h1 className="font-bold mb-2 md:mb-8">Stay Up To dated</h1>
          <Input placeholder="Your email address" />
        </div>
      </div>
    </div>
  );
}
