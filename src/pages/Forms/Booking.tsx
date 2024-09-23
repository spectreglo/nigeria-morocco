import { ChangeEvent, useEffect, useState } from "react";
import Input from "../../components/Input";

import { Button, Select, message } from "antd";

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
  const [rate, setRate] = useState(phoneNumber.startsWith("+234") ? 550 : 1650);
  const [selectedMeters, setSelectedMeters] = useState(0);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setSelectedMeters(Number(event.target.value));
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

  const [sector] = useState([
    `${t("Agriculture")}`,
    "Automobile",
    `${t("minerals")}`,
    `${t("renewable")}`,
    `${t("IT")}`,
    `${t("Education")}`,
    `${t("Finance")}`,
    `${t("Aviation")}`,
    `${t("Tourism")}`,
  ]);

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
        navigate("/Success", {
          state: {
            total: rate * selectedMeters,
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
      // style={{ backgroundImage: 'url(rectangle.png)' }}
      className="bg-cover bg-center h-[100vh] w-full relative overflow-x-hidden"
    >
      <div
        // style={{
        //   backgroundImage: 'url(round.png)',
        //   backgroundRepeat: 'no-repeat',
        // }}
        className="top-0 bottom-0 right-0 left-0 bg-bgImage  bg-contain bg-center flex flex-col items-center p-5 md:p-11 overflow-x-hidden"
      >
        <div className="mr-auto">
          <Link to="/">
            <BackIcon />
          </Link>
        </div>
        <h1 className="text-lightGreen font-bold text-4xl">{t("Book")}</h1>
        <span>{t("Part")}</span>
        <p className="text-2xl"> {t("Fill")}</p>

        <div className="flex-1 flex-col bg-transparent min-h-[200px] w-full md:w-[50%] mt-5 overflow-x-hidden">
          <span className="text-[18px] text-lightGreen">{t("Personal")}</span>
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
              outlined={false}
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
              outlined={false}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <Input
              required
              value={phoneNumber}
              disabled
              className="w-full md:w-[30%]"
              label={t("Mobile")}
              outlined={false}
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
              outlined={false}
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
              outlined={false}
            />

            <Input
              error={
                formik.touched.annual_turnover && formik.errors.annual_turnover
                  ? formik.errors.annual_turnover
                  : ""
              }
              value={formik.values.annual_turnover}
              id="annual_turnover"
              onChange={formik.handleChange}
              className="w-full md:w-[50%]"
              label={t("annual")}
              placeholder="Enter Your Annual Turnover"
              outlined={false}
            />
          </div>

          <span className="font-[500] text-[12px] my-4 mt-[20px] ">
            {t("your")} <span className="text-[red]">*</span>
          </span>
          {/* {sector.map((options, ind) => (
            <div className="my-3 flex items-center" key={ind.toString()}>
              <input
                className="mr-2"
                onChange={(e) => {
                  if (e.target.checked) {
                    if (isPersonalised) {
                      console.log('');
                    }
                    setSelectedSectors((prev) => [...prev, options]);
                  } else {
                    const filtered = selectedSectors.filter(
                      (selected) => selected !== options
                    );
                    setSelectedSectors(filtered);
                  }
                }}
                type="checkbox"
              />
              <span className="text-[12px]">{options}</span>
            </div>
          ))} */}

          {sector.map((option: string, ind) => (
            <div className="my-3 flex items-center" key={ind.toString()}>
              <input
                className="mr-2"
                onChange={() => {
                  setSelectedSectors([option]); // Set the selected option as the only item in the state
                }}
                type="radio"
                name="meetingOptions"
                checked={selectedSectors.includes(option)}
              />
              <span className="text-[12px]">{option}</span>
            </div>
          ))}
          <div className="h-[75px] bg-[#F2F2F2] w-full flex items-center">
            <h1 className="text-lightGreen font-bold text-2xl">
              {t("Booking")}
            </h1>
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
                className="w-[100%]"
                defaultValue={false}
                onChange={(e) => {
                  formik.values.personalised = e;

                  setIsPersonalised(e);
                  if (!phoneNumber.startsWith("+234")) {
                    if (isPersonalised) {
                      console.log("");
                    }
                    if (e == true) {
                      setRate(2700);
                    } else {
                      setRate(1650);
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
          {/* {formik.values.personalised ? (
            <AntTextArea
              id="personal_meters"
              error={
                formik.touched.personal_meters && formik.errors.personal_meters
                  ? formik.errors.personal_meters
                  : ''
              }
              value={formik.values.personal_meters}
              onChange={formik.handleChange}
              className="w-full"
              label={t('personal')}
              outlined={false}
            />
          ) : null} */}
          <div className="flex flex-col mt-[20px]">
            <h1>
              {t("size")} <span className="text-[red] ml-1">*</span>
            </h1>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-lightGreen"
                value={6}
                checked={selectedOption == "6"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">6 Sqm</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-lightGreen"
                value={9}
                checked={selectedOption == "9"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">9 Sqm</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-lightGreen"
                value={12}
                checked={selectedOption == "12"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">12 Sqm</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-lightGreen"
                value={18}
                checked={selectedOption == "18"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">18 Sqm</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-lightGreen"
                value={40}
                checked={selectedOption == "40"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">40 Sqm</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-lightGreen"
                value={50}
                checked={selectedOption == "50"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">50 Sqm</span>
            </label>
          </div>
          <div className="flex flex-col">
            {phoneNumber.startsWith("+212") ? (
              <h1 className="ml-auto font-bold text-black">
                MONTANT TOTAL (MAD)
              </h1>
            ) : (
              <h1 className="ml-auto font-bold text-black">TOTAL AMOUNT ($)</h1>
            )}
            <p className="ml-auto font-bold">
              {phoneNumber.startsWith("+212") ? "" : "$"}{" "}
              {(rate * selectedMeters).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-4 items-center justify-end mt-10 mb-5">
            <Button className="border-lightGreen bg-transparent text-lightGreen h-[38px]">
              Reset
            </Button>
            <Button
              loading={booking}
              onClick={() => {
                formik.handleSubmit();
              }}
              className="bg-lightGreen h-[38px]"
              type="primary"
            >
              {t("Payment")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
