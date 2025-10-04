import { useEffect, useState } from "react";
import Input from "../../components/Input";

import { Button, Select, message, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";

import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useFormik } from "formik";

import { useTranslation } from "react-i18next";

import { usePaystackPayment } from "react-paystack";
import useBooking from "./hooks/useBooking";

import BackIcon from "../../components/BackIcon";

export interface InitialValuesProps {
  name: string;

  mobile: string;
  email: string;
  space: string;
  full_name: string;
  job_title: string;
  annual_turnover: string;
  personalised: boolean;
  personal_meters: string;
  sector: string[];
  square_meters: string;
}

export default function Booking() {
  const location = useLocation();
  const [ref, setRef] = useState("");
  const [id] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [isPersonalised, setIsPersonalised] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [phoneNumber] = useState<string>(location.state.phoneNumber);
  const [rate, setRate] = useState(phoneNumber.startsWith("+234") ? 550 : 1600);
  const [selectedMeters, setSelectedMeters] = useState(0);

  // const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedOption(event.target.value);
  //   setSelectedMeters(Number(event.target.value));
  // };

  const onChangeOption = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setSelectedOption(e.target.value);
    setSelectedMeters(Number(e.target.value));
  };

  const [email] = useState("");

  const { book, booking } = useBooking();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (phoneNumber.startsWith("+234")) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("fr");
    }
  }, []);

  const sector = [
    `${t("Agriculture")}`,
    "Automobile",
    `${t("minerals")}`,
    `${t("renewable")}`,
    `${t("IT")}`,
    `${t("Education")}`,
    `${t("Finance")}`,
    `${t("Aviation")}`,
    `${t("Tourism")}`,
  ];

  const onSuccess = () => {
    setAmount(0);
    setRef("");
    message.success("Payment Successfull");
    navigate("/BookingInvoice", {
      state: { id },
    });
  };

  // you can call this function anything
  const onClose = () => {
    message.error("Payment Failed");
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Company name is required"),
    mobile: Yup.string().required("Mobile number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    space: Yup.string(),
  });
  const initialValues: InitialValuesProps = {
    name: "",
    mobile: phoneNumber,
    email: "",
    space: "",
    full_name: "",
    job_title: "",
    annual_turnover: "",
    personalised: false,
    personal_meters: "",
    sector: [],
    square_meters: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (selectedMeters == 0) {
        message.warning("Pleas fill all required fields");
        return;
      }
      values.sector = selectedSectors;
      values.square_meters = selectedOption + "Sqm";

      const booked = await book(values);
      if (booked.status) {
        formik.resetForm();
        message.success("Booked successfully!");
        const montantTotal = phoneNumber.startsWith("+212")
          ? rate * selectedMeters * 1.2
          : rate * selectedMeters;
        navigate("/Success", {
          state: {
            total: montantTotal,
            fromBooking: true,
          },
        });
        // console.log(booked, 'booked');
        // setRef(booked.data.data.transaction_ref);
        // setAmount(100 * Number(booked.data.data.amount));
        // setId(booked.data.data.id);
      }
    },
    validationSchema,
  });

  const makePayment = usePaystackPayment({
    reference: ref,
    email,
    amount, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_acd82313c5945d37a69e9e06195f153984cc70e0",
  });

  useEffect(() => {
    // This effect will run every time `amount` or `ref` changes
    if (amount !== 0 && ref !== "") {
      console.log(amount, ref);
      // If both `amount` and `ref` have been set, make the payment
      makePayment(onSuccess, onClose);
    }
  }, [amount, ref]);
  return (
    <div
      // style={{ backgroundImage: "url(rectangle.png)" }}
      className="bg-cover bg-center min-h-screen w-full relative overflow-x-hidden flex items-center justify-center py-8 md:py-0"
    >
      <div
        style={{
          backgroundImage: "url(round.png)",
          backgroundRepeat: "no-repeat",
        }}
        className="top-0 bottom-0 right-0 left-0 bg-bgImage bg-contain bg-center flex flex-col items-center p-5 md:p-11 w-full min-h-screen overflow-x-hidden"
      >
        <div className="mr-auto w-full max-w-2xl">
          <Link to="/">
            <BackIcon />
          </Link>
        </div>
        <div className="w-full max-w-2xl bg-white/90 shadow-2xl rounded-2xl p-8 flex flex-col items-center animate-fade-in">
          <h1 className="text-primary font-bold text-3xl md:text-4xl mb-1">
            {t("Book")}
          </h1>
          <span className="mb-2 text-gray-700">{t("Part")}</span>
          <p className="text-xl text-gray-600 mb-4">{t("Fill")}</p>
          <div className="w-full border-b border-gray-200 mb-6" />
          <div className="flex-1 flex-col bg-transparent min-h-[200px] w-full mt-0 overflow-x-hidden">
            <span className="text-lg text-primary font-semibold mb-2 block">
              {t("Personal")}
            </span>
            <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
              <Input
                error={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ""
                }
                value={formik.values.name}
                onChange={formik.handleChange}
                id="name"
                className="w-full md:w-[50%]"
                required
                label={t("Name")}
                placeholder="Enter the name of the company"
                outlined={true}
              />
              <Input
                error={
                  formik.touched.full_name && formik.errors.full_name
                    ? formik.errors.full_name
                    : ""
                }
                value={formik.values.full_name}
                id="full_name"
                onChange={formik.handleChange}
                className="w-full md:w-[50%]"
                required
                label={t("full")}
                placeholder="Enter Your Full Name"
                outlined={true}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
              <Input
                required
                value={phoneNumber}
                disabled
                className="w-full md:w-[30%]"
                label="Mobile"
                outlined={true}
              />
              <Input
                required
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
                value={formik.values.email}
                id="email"
                onChange={formik.handleChange}
                className="w-full md:w-[70%]"
                label={t("Email")}
                outlined={true}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
              <Input
                error={
                  formik.touched.job_title && formik.errors.job_title
                    ? formik.errors.job_title
                    : ""
                }
                value={formik.values.job_title}
                onChange={formik.handleChange}
                id="job_title"
                className="w-full md:w-[50%]"
                label={t("job")}
                placeholder="Job Title"
                outlined={true}
              />
              <Input
                error={
                  formik.touched.annual_turnover &&
                  formik.errors.annual_turnover
                    ? formik.errors.annual_turnover
                    : ""
                }
                value={formik.values.annual_turnover}
                id="annual_turnover"
                onChange={formik.handleChange}
                className="w-full md:w-[50%]"
                label={t("annual")}
                placeholder="Enter Your Annual Turnover"
                outlined={true}
                prefix={phoneNumber.startsWith("+212") ? "" : "$"}
              />
            </div>
            <div className="mt-6 w-full">
              <span className="font-[500] text-[12px] my-4 mt-[20px] ">
                {t("your")} <span className="text-[red]">*</span>
              </span>
              {sector.map((option: string, ind) => (
                <div className="my-3 flex items-center" key={ind.toString()}>
                  <Radio
                    onChange={() => {
                      setSelectedSectors([option]);
                    }}
                    checked={selectedSectors.includes(option)}
                  >
                    {option}
                  </Radio>
                </div>
              ))}
            </div>
            <div className="h-[75px] w-full flex items-center border-t border-gray-200 mt-10">
              <h1 className="text-primary font-bold text-lg">{t("Booking")}</h1>
            </div>
            {!phoneNumber.startsWith("+234") && (
              <div className="w-full md:w-[100%] mt-[5px]">
                <span className="text-[12px]">{t("space")}</span>
                <Select
                  status={
                    formik.touched.personalised && formik.errors.personalised
                      ? "error"
                      : ""
                  }
                  className="w-[100%] h-[38px]"
                  defaultValue={false}
                  onChange={(e) => {
                    formik.values.personalised = e;
                    setIsPersonalised(e);
                    if (!phoneNumber.startsWith("+234")) {
                      if (isPersonalised) {
                        console.log("");
                      }
                      if (e == true) {
                        setRate(2400);
                      } else {
                        setRate(1600);
                      }
                    }
                  }}
                  options={[
                    { value: true, label: t("Pesonalised") },
                    { value: false, label: t("Non-Personalised") },
                  ]}
                />
              </div>
            )}
            <div className="flex flex-col mt-[20px]">
              <h1>
                {t("size")} <span className="text-[red] ml-1">*</span>
              </h1>
              <Radio.Group onChange={onChangeOption} value={selectedOption}>
                {isPersonalised ? (
                  <Space direction="vertical">
                    {/* <Radio value={6}>6 Sqm</Radio> */}
                    <Radio value={9}>
                      9 Sqm ( {t("spaceItems")}) + {t("registrationFor")} 2{" "}
                      {t("personsForAllCities")}
                    </Radio>
                    <Radio value={12}>
                      12 Sqm ( {t("spaceItems")}) + {t("registrationFor")} 3{" "}
                      {t("personsForAllCities")}
                    </Radio>
                    <Radio value={18}>
                      18 Sqm ( {t("spaceItems")}) + {t("registrationFor")} 4{" "}
                      {t("personsForAllCities")}
                    </Radio>
                    {/* <Radio value={40}>40 Sqm</Radio>
                  <Radio value={50}>50 Sqm</Radio> */}
                  </Space>
                ) : (
                  <Space direction="vertical">
                    {/* <Radio value={6}>6 Sqm</Radio> */}
                    <Radio value={9}>9 Sqm ( {t("spaceItems")})</Radio>
                    <Radio value={12}>
                      12 Sqm ( {t("spaceItems")}) + {t("registrationFor")} 1{" "}
                      {t("personsForAllCities")}
                    </Radio>
                    <Radio value={18}>
                      18 Sqm ( {t("spaceItems")}) + {t("registrationFor")} 2{" "}
                      {t("personsForAllCities")}
                    </Radio>
                    {/* <Radio value={40}>40 Sqm</Radio>
                  <Radio value={50}>50 Sqm</Radio> */}
                  </Space>
                )}
              </Radio.Group>
            </div>
            <div className="flex flex-col mt-4">
              {phoneNumber.startsWith("+212") ? (
                <div className="bg-silver/40 border border-gray-200 rounded-xl px-4 py-4 shadow flex flex-col items-center max-w-xs w-full mx-auto">
                  <div className="flex justify-between w-full mb-1">
                    <span className="text-gray-700 font-medium">
                      Sous-total
                    </span>
                    <span className="font-semibold">
                      {(rate * selectedMeters).toLocaleString()} MAD HT
                    </span>
                  </div>
                  <div className="flex justify-between w-full mb-1">
                    <span className="text-gray-700 font-medium">TVA (20%)</span>
                    <span className="font-semibold">
                      {(0.2 * rate * selectedMeters).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                      MAD
                    </span>
                  </div>
                  <div className="border-b border-gray-300 w-full my-2" />
                  <div className="flex justify-between w-full">
                    <span className="text-primary font-bold text-lg">
                      Montant Total
                    </span>
                    <span className="text-green-700 font-bold text-lg">
                      {(rate * selectedMeters * 1.2).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                      MAD TTC
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-silver/40 border border-gray-200 rounded-xl px-8 py-4 shadow flex flex-col items-center max-w-xs w-full mx-auto">
                  <div className="flex justify-between w-full mb-1">
                    <span className="text-gray-700 font-medium">
                      Total Amount ($)
                    </span>
                    <span className="font-bold">
                      $ {(rate * selectedMeters).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-4 items-center justify-end mt-10 mb-5">
              <Button
                className="border-primary bg-transparent text-primary h-[38px] hover:bg-primary/10 transition-all duration-200"
                onClick={() => {
                  formik.resetForm();
                  setSelectedSectors([]);
                  setSelectedOption("");
                  setSelectedMeters(0);
                  setIsPersonalised(false);
                  setRate(phoneNumber.startsWith("+234") ? 550 : 1600);
                }}
              >
                Reset
              </Button>
              <Button
                loading={booking}
                onClick={() => {
                  formik.handleSubmit();
                }}
                className="bg-primary h-[38px] text-white font-semibold rounded-lg shadow hover:scale-105 transition-all duration-200"
                type="primary"
              >
                {t("Payment")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
