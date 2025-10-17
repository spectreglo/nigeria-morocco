import { useEffect, useState, useMemo } from "react";
import Input from "../../components/Input";
import { InboxOutlined } from "@ant-design/icons";

import {
  Button,
  message,
  Modal,
  notification,
  Select,
  Spin,
  Upload,
  Checkbox,
  Radio,
} from "antd";
import PaymentSumarryModal from "./components/PaymentSumarryModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useFormik } from "formik";
import useRegister from "./hooks/useRegister";
import { useTranslation } from "react-i18next";
import AntTextArea from "../../components/TextArea";
import BackIcon from "../../components/BackIcon";

const { Dragger } = Upload;

export interface InitialValuesProps {
  company_name: string;
  creation_date: string;
  address: string;
  number_of_employees: string;
  website: string;
  mobile: string;
  email: string;
  company_niche: string[];
  import_morocco: string;
  export_morocco: string;
  meeting_sectors: string[];
  image_url: string;
  governmental: boolean;
  ministry: string;
  first_name: string;
  annual_turnover: string;
  designation: string;
  cin: string;
  passport_number: string;
  passport_expiry: string;
  cin_expiry: string;
  last_name: string;
  cities?: string[];
}
interface UploadProps {
  name: string;
  multiple: boolean;
  action: string;
  beforeUpload: (file: File) => boolean | void | Promise<boolean | void>;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  accept: string;
}
export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedNiche, setNiche] = useState<string[] | []>([]);
  const [selectedMeeting, setMeeting] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [email] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { register, registering } = useRegister();
  const navigate = useNavigate();
  const location = useLocation();
  const [isGov, setIsGov] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (phoneNumber.startsWith("+234")) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("fr");
    }
  }, []);
  const [phoneNumber] = useState<string>(location.state.phoneNumber);
  // const openSummaryModal = () => {
  //   setOpenSummary(true);
  // };

  const closeSummary = () => {
    setOpenSummary(false);
  };

  const validationSchema = Yup.object().shape({
    number_of_employees: Yup.number(),
    website: Yup.string(),
    mobile: Yup.string().required("Mobile number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    company_niche: Yup.array()
      .of(Yup.string())
      .required("Company niche is required"),
    meeting_sectors: Yup.array().of(Yup.string()),
    import_morocco: Yup.string(),
    export_morocco: Yup.string(),
    image_url: Yup.string().url("Invalid image URL"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    cities: Yup.array()
      .of(Yup.string())
      .required("At least one city is required"),
  });

  const initialValues: InitialValuesProps = {
    company_name: "",
    creation_date: "",
    address: "",
    number_of_employees: "",
    website: "",
    mobile: phoneNumber,
    email: "",
    company_niche: [],
    import_morocco: "",
    export_morocco: "",
    meeting_sectors: [],
    image_url: "",
    governmental: false,
    ministry: "",
    annual_turnover: "",
    designation: "",
    cin: "",
    passport_number: "",
    passport_expiry: "",
    cin_expiry: "",
    last_name: "",
    first_name: "",
    cities: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const cityCount = values.cities?.length || 0;
      const base = cityCount * 704;
      const tax = base * 0.2;
      const total = base + tax;

      if (values.governmental) {
        if (!values.ministry) {
          notification.error({ message: "Please add an organisation" });
          return;
        }
      }

      // if (!values.image_url) {
      //   notification.error({ message: "Please upload your passport" });
      //   return;
      // }

      if (values.cities?.length === 0) {
        notification.error({ message: "Please select at least one city" });
        return;
      }

      if (phoneNumber.startsWith("+234")) {
        if (!values.passport_expiry || !values.passport_number) {
          notification.error({
            message: "Please complete your international passport record",
          });
          return;
        }
      }

      if (phoneNumber.startsWith("+212")) {
        if (!values.cin || !values.cin_expiry) {
          notification.error({
            message: "Please complete your international passport record",
          });
          return;
        }
      }
      const registered = await register(values);
      if (registered.status) {
        setUserId(registered.data);
        formik.resetForm();
        message.success("Registered successfully!");
        if (phoneNumber.startsWith("+234")) {
          navigate("/Success", {
            state: {
              total,
              cities: values.cities,
            },
          });
          // setEmail(values.email);

          // openSummaryModal();
        } else {
          navigate("/Success", {
            state: {
              total,
              cities: values.cities,
            },
          });
        }
      }
    },
    validationSchema,
  });

  const { base, tax, total } = useMemo(() => {
    const cityCount = formik.values.cities?.length || 0;
    const base = cityCount * 704;
    const tax = base * 0.2;
    const total = base + tax;
    return { base, tax, total };
  }, [formik.values.cities]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const NigerianMinisteries = [
    {
      label: "AHMADU BELLO UNIVERSITY",
      value: "AHMADU BELLO UNIVERSITY",
    },
    {
      label: "BAUCHI STATE GOVERNMENT",
      value: "BAUCHI STATE GOVERNMENT",
    },
    {
      label: "FEDERAL MINISTRY FOR FEDERAL CAPITAL TERRITORY (M.F.C.T.)",
      value: "FEDERAL MINISTRY FOR FEDERAL CAPITAL TERRITORY (M.F.C.T.)",
    },
    {
      label: "FEDERAL MINISTRY OF AGRICULTURE AND NATURAL RESOURCES",
      value: "FEDERAL MINISTRY OF AGRICULTURE AND NATURAL RESOURCES",
    },
    {
      label: "FEDERAL MINISTRY OF AVIATION",
      value: "FEDERAL MINISTRY OF AVIATION",
    },
    {
      label: "FEDERAL MINISTRY OF COMMERCE & TOURISM",
      value: "FEDERAL MINISTRY OF COMMERCE & TOURISM",
    },
    {
      label: "FEDERAL MINISTRY OF CULTURE TOURISM AND NATIONAL ORIENTATION",
      value: "FEDERAL MINISTRY OF CULTURE TOURISM AND NATIONAL ORIENTATION",
    },
    {
      label: "FEDERAL MINISTRY OF DEFENCE",
      value: "FEDERAL MINISTRY OF DEFENCE",
    },
    {
      label: "FEDERAL MINISTRY OF EDUCATION & YOUTH DEVELOPMENT",
      value: "FEDERAL MINISTRY OF EDUCATION & YOUTH DEVELOPMENT",
    },
    {
      label: "FEDERAL MINISTRY OF ENVIRONMENT",
      value: "FEDERAL MINISTRY OF ENVIRONMENT",
    },
    {
      label: "FEDERAL MINISTRY OF FINANCE & ECONOMIC DEVELOPMENT",
      value: "FEDERAL MINISTRY OF FINANCE & ECONOMIC DEVELOPMENT",
    },
    {
      label: "FEDERAL MINISTRY OF HEALTH AND SOCIAL SERVICES",
      value: "FEDERAL MINISTRY OF HEALTH AND SOCIAL SERVICES",
    },
    {
      label: "FEDERAL MINISTRY OF INDUSTRY, TRADE AND INVESTMENT",
      value: "FEDERAL MINISTRY OF INDUSTRY, TRADE AND INVESTMENT",
    },
    {
      label: "FEDERAL MINISTRY OF INFORMATION & COMMUNICATIONS",
      value: "FEDERAL MINISTRY OF INFORMATION & COMMUNICATIONS",
    },
    {
      label: "FEDERAL MINISTRY OF INTERNAL AFFAIRS",
      value: "FEDERAL MINISTRY OF INTERNAL AFFAIRS",
    },
    {
      label: "FEDERAL MINISTRY OF JUSTICE",
      value: "FEDERAL MINISTRY OF JUSTICE",
    },
    {
      label: "FEDERAL MINISTRY OF LABOUR AND PRODUCTIVITY",
      value: "FEDERAL MINISTRY OF LABOUR AND PRODUCTIVITY",
    },
    {
      label: "FEDERAL MINISTRY OF PETROLEUM RESOURCES",
      value: "FEDERAL MINISTRY OF PETROLEUM RESOURCES",
    },
    {
      label: "FEDERAL MINISTRY OF POWER",
      value: "FEDERAL MINISTRY OF POWER",
    },
    {
      label: "FEDERAL MINISTRY OF SCIENCE AND TECHNOLOGY",
      value: "FEDERAL MINISTRY OF SCIENCE AND TECHNOLOGY",
    },
    {
      label: "FEDERAL MINISTRY OF SOLID MINERALS DEVELOPMENT",
      value: "FEDERAL MINISTRY OF SOLID MINERALS DEVELOPMENT",
    },
    {
      label: "FEDERAL MINISTRY OF SPECIAL DUTIES",
      value: "FEDERAL MINISTRY OF SPECIAL DUTIES",
    },
    {
      label: "FEDERAL MINISTRY OF TRANSPORT",
      value: "FEDERAL MINISTRY OF TRANSPORT",
    },
    {
      label: "FEDERAL MINISTRY OF WATER RESOURCES & RURAL DEVELOPMENT",
      value: "FEDERAL MINISTRY OF WATER RESOURCES & RURAL DEVELOPMENT",
    },
    {
      label: "FEDERAL MINISTRY OF WOMEN AFFAIRS AND SOCIAL DEVELOPMENT",
      value: "FEDERAL MINISTRY OF WOMEN AFFAIRS AND SOCIAL DEVELOPMENT",
    },
    {
      label: "FEDERAL MINISTRY OF WORKS",
      value: "FEDERAL MINISTRY OF WORKS",
    },
    {
      label: "FEDERAL MINISTRY OF YOUTH & SPORT",
      value: "FEDERAL MINISTRY OF YOUTH & SPORT",
    },
    {
      label: "FEDERAL UNIVERSITY KASHERE",
      value: "FEDERAL UNIVERSITY KASHERE",
    },
    {
      label: "GOMBE STATE GOVERNMENT",
      value: "GOMBE STATE GOVERNMENT",
    },
    {
      label: "JIGAWA STATE GOVERNMENT",
      value: "JIGAWA STATE GOVERNMENT",
    },
    {
      label: "KADUNA STATE GOVERNMENT",
      value: "KADUNA STATE GOVERNMENT",
    },
    {
      label: "KANO STATE GOVERNMENT",
      value: "KANO STATE GOVERNMENT",
    },
    {
      label: "MINISTRY OF CULTURE AND COMMUNICATION",
      value: "MINISTRY OF CULTURE AND COMMUNICATION",
    },
    {
      label: "MINISTRY OF ECONOMY AND FINANCE",
      value: "MINISTRY OF ECONOMY AND FINANCE",
    },
    {
      label: "MINISTRY OF ENERGY, MINES AND ENVIROMENT",
      value: "MINISTRY OF ENERGY, MINES AND ENVIROMENT",
    },
    {
      label: "MINISTRY OF EQUIPMENT, TRANSPORT AND LOGISTICS",
      value: "MINISTRY OF EQUIPMENT, TRANSPORT AND LOGISTICS",
    },
    {
      label: "MINISTRY OF FOREIGN AFFAIRS",
      value: "MINISTRY OF FOREIGN AFFAIRS",
    },
    {
      label: "MINISTRY OF INTERIOR",
      value: "MINISTRY OF INTERIOR",
    },
    {
      label:
        "MINISTRY OF NATIONAL TERITORY PLANNING, LAND PLANNING AND CITY POLICY",
      value:
        "MINISTRY OF NATIONAL TERITORY PLANNING, LAND PLANNING AND CITY POLICY",
    },
    {
      label: "MINISTRY OF STEEL DEVELOPMENT",
      value: "MINISTRY OF STEEL DEVELOPMENT",
    },
    {
      label: "MINISTRY OF TOURISM, AIR TRANSPORT, CRAFT AND SOCIAL ECONOMY",
      value: "MINISTRY OF TOURISM, AIR TRANSPORT, CRAFT AND SOCIAL ECONOMY",
    },
    {
      label: "MINISTRY OF YOUTH, CULTURE AND COMMUNICATION",
      value: "MINISTRY OF YOUTH, CULTURE AND COMMUNICATION",
    },
    {
      label: "NADDC",
      value: "NADDC",
    },
    {
      label: "NASENI",
      value: "NASENI",
    },
    {
      label: "NATIONAL ASSEMBLY OF NIGERIA",
      value: "NATIONAL ASSEMBLY OF NIGERIA",
    },
    {
      label: "NEXIM",
      value: "NEXIM",
    },
    {
      label: "NIGER STATE GOVERNMENT",
      value: "NIGER STATE GOVERNMENT",
    },
    {
      label: "NIGERIAN INVESTMENT PROMOTION COUNCIL",
      value: "NIGERIAN INVESTMENT PROMOTION COUNCIL",
    },
    {
      label: "NATIONAL AGRICULTURAL DEVELOPMENT FUNDS",
      value: "NATIONAL AGRICULTURAL DEVELOPMENT FUNDS",
    },
    {
      label: "NITDA",
      value: "NITDA",
    },
    {
      label: "NSIA",
      value: "NSIA",
    },
    {
      label: "RURAL ELECTRIFICATION AGENCY (REA)",
      value: "RURAL ELECTRIFICATION AGENCY (REA)",
    },
    {
      label: "SMEDAN",
      value: "SMEDAN",
    },
  ];

  const MoroccanMinisteries = [
    {
      label: "Ministère de l'Industrie et du Commerce",
      value: "Ministère de l'Industrie et du Commerce",
    },
    {
      label: "Ministère de l'intérieur",
      value: "Ministère de l'intérieur",
    },
    {
      label:
        "Ministre de la Transition Énergétique et du Développement Durable",
      value:
        "Ministre de la Transition Énergétique et du Développement Durable",
    },
    {
      label: "Office National des Hydrocarbures et des Mines (ONHYM)",
      value: "Office National des Hydrocarbures et des Mines (ONHYM)",
    },
    {
      label:
        "Ministère de l'Agriculture, de la Pêche maritime, du Développement rural et des Eaux et forêts",
      value:
        "Ministère de l'Agriculture, de la Pêche maritime, du Développement rural et des Eaux et forêts",
    },
    {
      label: "La Maison de l'Artisan",
      value: "La Maison de l'Artisan",
    },
    {
      label:
        "Ministry of Foreign Affairs and International Cooperation and Moroccan Expatriates",
      value:
        "Ministry of Foreign Affairs and International Cooperation and Moroccan Expatriates",
    },
    {
      label:
        "Islamic world Educational, Scientific and Cultural Organization (ICESCO)",
      value:
        "Islamic world Educational, Scientific and Cultural Organization (ICESCO)",
    },
    {
      label: "Nigeria Embassy Rabat",
      value: "Nigeria Embassy Rabat",
    },
  ];

  const companyNiche = [
    `${t("Importer")}`,
    `${t("Wholesaler")}`,
    `${t("Intermediary")}`,
    `${t("CentralPurchasing")}`,
    `${t("Manufacturer")}`,
  ];

  const meetingWith = [
    `${t("Agriculture")}`,
    phoneNumber.startsWith("+234") ? "Agro Industry" : "Agro-industrie",
    "Automobile",
    `${t("minerals")}`,
    `${t("renewable")}`,
    `${t("IT")}`,
    `${t("Education")}`,
    `${t("Finance")}`,
    `${t("Aviation")}`,
    `${t("Tourism")}`,
  ];

  const cities = [
    {
      label: `Lagos (${t("openingCeremony")}, ${t("Exhibitions")}, ${t(
        "B2BSessions"
      )}, ${t("PanelSessions")}, ${t("Tours")})`,
      value: "Lagos",
    },
    {
      label: `Kano (${t("StakeholderRoundtable")})`,
      value: "Kano",
    },
    {
      label: `Abuja (${t("HighLevelNetworkingAwardsEvent")})`,
      value: "Abuja",
    },
  ];

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: "image/png, image/jpeg",
    action: "https://api.cloudinary.com/v1_1/djlbovjlt/image/upload",
    beforeUpload: (file) => {
      const uploadPreset = "v4lnyqau"; // Replace with your Cloudinary upload preset name
      setUploading(true); // Set uploading state to true

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      // Upload the file
      return fetch("https://api.cloudinary.com/v1_1/djlbovjlt/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the upload response
          console.log("Upload response:", data);
          if (data.error) {
            message.error(`${file.name} upload failed: ${data.error.message}`);
          } else {
            message.success(`${file.name} uploaded successfully.`);
            formik.values.image_url = data.url;
          }
        })
        .catch((error) => {
          console.error("Upload error:", error);
          message.error(`${file.name} upload failed.`);
        })
        .finally(() => {
          setUploading(false); // Set uploading state to false after the upload process is done
        });

      // Return false to prevent default upload behavior
      // Returning the fetch Promise allows async handling
      return false;
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  return (
    <div
      // style={{ backgroundImage: "url(rectangle.png)" }}
      className="bg-cover bg-center min-h-screen w-full relative overflow-x-hidden flex items-center justify-center py-8 md:py-0 md:bg-[url('rectangle.png')] bg-none"
    >
      <div
        // style={{
        //   backgroundImage: 'url(round.png)',
        //   backgroundRepeat: 'no-repeat',
        // }}
        className="top-0 bottom-0 right-0 left-0 bg-bgImage bg-contain bg-center flex flex-col items-center p-5 md:p-11 w-full min-h-screen overflow-x-hidden"
      >
        <div className="mr-auto w-full max-w-2xl">
          <Link to="/">
            <BackIcon />
          </Link>
        </div>
        {/* Progress Indicator removed */}
        <div className="w-full max-w-2xl bg-white/90 shadow-2xl rounded-2xl p-8 flex flex-col items-center animate-fade-in">
          <h1 className="text-primary font-bold text-3xl md:text-4xl mb-1">
            {t("Register")}
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
                  formik.touched.first_name && formik.errors.first_name
                    ? formik.errors.first_name
                    : ""
                }
                value={formik.values.first_name}
                onChange={formik.handleChange}
                id="first_name"
                className="w-full md:w-[50%]"
                required
                label={t("full")}
                placeholder="Enter Your First Name"
                outlined={true}
              />

              <Input
                error={
                  formik.touched.last_name && formik.errors.last_name
                    ? formik.errors.last_name
                    : ""
                }
                value={formik.values.last_name}
                onChange={formik.handleChange}
                id="last_name"
                className="w-full md:w-[50%]"
                required
                label={t("last")}
                placeholder="Enter Your Last Name"
                outlined={true}
              />
            </div>
            <div className="w-full mt-4">
              <span className="text-[12px]">{t("Organization")}</span>
              <Select
                status={
                  formik.touched.governmental && formik.errors.governmental
                    ? "error"
                    : ""
                }
                className="w-[100%] h-[38px]"
                defaultValue={false}
                onChange={(e) => {
                  formik.values.governmental = e;
                  if (isGov) {
                    console.log(e);
                  }
                  setIsGov((prev) => !prev);
                }}
                options={[
                  { value: true, label: t("Govermental") },
                  { value: false, label: t("Private") },
                ]}
              />
            </div>
            {phoneNumber.startsWith("+234") && (
              <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
                <Input
                  value={formik.values.passport_number}
                  onChange={formik.handleChange}
                  id="passport_number"
                  className="w-full md:w-[70%]"
                  required
                  label="Passport number"
                  placeholder="Enter your passport number"
                  outlined={true}
                />

                <Input
                  value={formik.values.passport_expiry}
                  id="passport_expiry"
                  onChange={formik.handleChange}
                  className="w-full md:w-[30%]"
                  required
                  label="Passport expiration date"
                  placeholder="Enter the expiration date"
                  outlined={true}
                  type="date"
                />
              </div>
            )}

            {formik.values.governmental ? (
              <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
                <div className="w-full md:w-[70%] mt-4">
                  <span className="text-[12px]">{t("Ministry")}</span>
                  <br />
                  {phoneNumber.startsWith("+234") ? (
                    <Select
                      status={
                        formik.touched.governmental &&
                        formik.errors.governmental
                          ? "error"
                          : ""
                      }
                      className="w-[100%] h-[38px] md:w-[100%]"
                      defaultValue={""}
                      onChange={(e) => {
                        formik.values.ministry = e;
                        if (isGov) {
                          console.log(e);
                        }
                        setIsGov((prev) => !prev);
                      }}
                      options={NigerianMinisteries}
                    />
                  ) : (
                    <Select
                      status={
                        formik.touched.governmental &&
                        formik.errors.governmental
                          ? "error"
                          : ""
                      }
                      className="w-[100%] h-[38px] md:w-[100%]"
                      defaultValue={""}
                      onChange={(e) => {
                        formik.values.ministry = e;
                        if (isGov) {
                          console.log(e);
                        }
                        setIsGov((prev) => !prev);
                      }}
                      options={MoroccanMinisteries}
                    />
                  )}
                </div>
                <div className="w-full md:w-[30%]">
                  <Input
                    id="designation"
                    type="text"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    className="w-full"
                    required
                    label={t("Designation")}
                    outlined={true}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
                  <Input
                    error={
                      formik.touched.company_name && formik.errors.company_name
                        ? formik.errors.company_name
                        : ""
                    }
                    value={formik.values.company_name}
                    onChange={formik.handleChange}
                    id="company_name"
                    className="w-full md:w-[70%]"
                    required
                    label={t("Name")}
                    placeholder="Enter the name of the company"
                    outlined={true}
                  />

                  <Input
                    error={
                      formik.touched.creation_date &&
                      formik.errors.creation_date
                        ? formik.errors.creation_date
                        : ""
                    }
                    value={formik.values.creation_date}
                    id="creation_date"
                    onChange={formik.handleChange}
                    className="w-full md:w-[30%]"
                    required
                    label={t("Creation")}
                    placeholder="Enter the name of the company"
                    outlined={true}
                    type="date"
                  />
                </div>

                <AntTextArea
                  error={
                    formik.touched.address && formik.errors.address
                      ? formik.errors.address
                      : ""
                  }
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  required
                  id="address"
                  label={t("Address")}
                  outlined={true}
                  placeholder="Type your address"
                />
                <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
                  <div className="w-full md:w-[50%]">
                    <Input
                      id="designation"
                      type="text"
                      value={formik.values.designation}
                      onChange={formik.handleChange}
                      className="w-full"
                      required
                      label="Designation"
                      outlined={true}
                    />
                  </div>
                  <div className="w-full md:w-[50%]">
                    <Input
                      id="annual_turnover"
                      type="number"
                      value={formik.values.annual_turnover}
                      onChange={formik.handleChange}
                      className="w-full"
                      label={`${t("annual")} ${
                        phoneNumber.startsWith("+234") ? "(USD)" : "(USD)"
                      }`}
                      outlined={true}
                      prefix="$"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
                  <Input
                    error={
                      formik.touched.website && formik.errors.website
                        ? formik.errors.website
                        : ""
                    }
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    className="w-full md:w-[50%]"
                    label={t("Website")}
                    id="website"
                    placeholder="www.example.com"
                    outlined={true}
                  />

                  <Input
                    id="number_of_employees"
                    error={
                      formik.touched.number_of_employees &&
                      formik.errors.number_of_employees
                        ? formik.errors.number_of_employees
                        : ""
                    }
                    value={formik.values.number_of_employees}
                    onChange={formik.handleChange}
                    className="w-full md:w-[50%]"
                    label={t("Employees")}
                    outlined={true}
                    type="number"
                  />
                </div>
              </>
            )}
            {!phoneNumber.startsWith("+234") && (
              <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
                <Input
                  id="cin"
                  error={
                    formik.touched.cin && formik.errors.cin
                      ? formik.errors.cin
                      : ""
                  }
                  value={formik.values.cin}
                  onChange={formik.handleChange}
                  className="w-full md:w-[70%]"
                  required
                  label={"CIN Nombre"}
                  outlined={true}
                  type="number"
                />

                <Input
                  value={formik.values.cin_expiry}
                  id="cin_expiry"
                  onChange={formik.handleChange}
                  className="w-full md:w-[30%]"
                  required
                  label={t("expiry")}
                  placeholder="Enter the expiration date"
                  outlined={true}
                  type="date"
                />
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
              <Input
                required
                value={phoneNumber}
                disabled
                className="w-full md:w-[50%]"
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
                className="w-full md:w-[50%]"
                label={t("Email")}
                outlined={true}
              />
            </div>
            {!formik.values.governmental && (
              <>
                <h1 className="my-[10px] text-[13px] font-[500]">
                  {t("Is")}
                  <span className="text-[red]">*</span>
                </h1>
                {companyNiche.map((options, ind) => (
                  <div className="mt-3 flex items-center" key={ind.toString()}>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNiche((prev) => [...prev, options]);
                        } else {
                          const filtered = selectedNiche.filter(
                            (selected) => selected !== options
                          );
                          setNiche(filtered);
                        }
                      }}
                    >
                      {options}
                    </Checkbox>
                  </div>
                ))}
              </>
            )}

            <AntTextArea
              error={
                formik.touched.import_morocco && formik.errors.import_morocco
                  ? formik.errors.import_morocco
                  : ""
              }
              value={formik.values.import_morocco}
              id="import_morocco"
              onChange={formik.handleChange}
              label={t("What")}
              outlined={true}
              placeholder="Type here"
            />

            <AntTextArea
              error={
                formik.touched.export_morocco && formik.errors.export_morocco
                  ? formik.errors.export_morocco
                  : ""
              }
              value={formik.values.export_morocco}
              id="export_morocco"
              onChange={formik.handleChange}
              className="mb-10"
              label={t("Export")}
              outlined={true}
              placeholder="Type here"
            />
            <span className="font-[500]">{t("Meeting")}</span>

            {meetingWith.map((option: string, ind) => (
              <div className="my-3 flex items-center" key={ind.toString()}>
                <Radio
                  onChange={() => {
                    setMeeting([option]); // Set the selected option as the only item in the state
                  }}
                  checked={selectedMeeting.includes(option)}
                >
                  {option}
                </Radio>
              </div>
            ))}

            <span className="font-[500]">
              {t("Passport")} <span className="text-[red]">*</span>
            </span>
            <div className="h-[200px] md:h-[150px] mt-4">
              <Dragger showUploadList={true} className="h-[150px]" {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>

                <p className="ant-upload-text">
                  {uploading && <Spin size="large" spinning />}
                  {t("Drag")}
                </p>
                <p className="ant-upload-hint">{t("UploadHint")}</p>
              </Dragger>
            </div>

            {/* City selection checkboxes */}
            <div className="mt-6">
              <span className="font-[500] block mb-2">
                {t("selectCity")} <span className="text-[red]">*</span>
              </span>
              <div className="flex flex-col gap-3">
                {cities.map((city) => {
                  const [main, ...desc] = city.label.split("(");
                  const isSelected = formik.values.cities?.includes(city.value);
                  return (
                    <label
                      key={city.value}
                      className={`flex items-start gap-3 p-4 rounded-xl border bg-white shadow-sm transition-all cursor-pointer mb-2 ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary"
                      }`}
                      style={{ minHeight: "64px" }}
                    >
                      <Checkbox
                        required
                        checked={isSelected}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          let updated = formik.values.cities || [];
                          if (checked) {
                            updated = [...updated, city.value];
                          } else {
                            updated = updated.filter(
                              (c: string) => c !== city.value
                            );
                          }
                          formik.setFieldValue("cities", updated);
                        }}
                        className="mt-1"
                      />
                      <span className="text-base text-gray-700 font-medium leading-tight">
                        {main.trim()}
                        {desc.length > 0 && (
                          <span className="block text-sm text-gray-500 font-normal mt-1">
                            {desc
                              .join("(")
                              .replace(/\)$/, "")
                              .split(",")
                              .map((d, i) => (
                                <span key={i} className="block">
                                  {d.trim()}
                                </span>
                              ))}
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                {t("cityInfo")}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">
                ({t("cityInfo2")})
              </span>

              <div className="w-full flex justify-center mt-6">
                <div className="bg-silver/40 border border-gray-200 rounded-xl px-4 py-4 shadow flex flex-col items-center max-w-xs w-full">
                  {(() => {
                    // const cityCount = formik.values.cities?.length || 0;
                    // const base = cityCount * 704;
                    // const tax = base * 0.2;
                    // const total = base + tax;
                    return (
                      <>
                        <div className="flex justify-between w-full mb-1">
                          <span className="text-gray-700 font-medium">
                            {phoneNumber.startsWith("+234")
                              ? "Subtotal"
                              : "Sous-total"}
                          </span>
                          <span className="font-semibold">
                            {base.toLocaleString()} MAD HT
                          </span>
                        </div>
                        <div className="flex justify-between w-full mb-1">
                          <span className="text-gray-700 font-medium">
                            {phoneNumber.startsWith("+234")
                              ? "Tax (20%)"
                              : "TVA (20%)"}
                          </span>
                          <span className="font-semibold">
                            {tax.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}{" "}
                            MAD
                          </span>
                        </div>
                        <div className="border-b border-gray-300 w-full my-2" />
                        <div className="flex justify-between w-full">
                          <span className="text-primary font-bold text-lg">
                            {phoneNumber.startsWith("+234")
                              ? "Grand Total"
                              : "Montant Total"}
                          </span>
                          <span className="text-green-700 font-bold text-lg">
                            {total.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}{" "}
                            MAD TTC
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center justify-end mt-10 mb-5">
              <Button
                className="border-primary bg-transparent text-primary h-[38px] hover:bg-primary/10 transition-all duration-200"
                onClick={() => {
                  formik.resetForm();
                  setNiche([]);
                  setMeeting([]);
                }}
              >
                Reset
              </Button>
              <Button
                disabled={uploading}
                loading={registering}
                onClick={() => {
                  formik.values.company_niche = selectedNiche;
                  formik.values.meeting_sectors = selectedMeeting;
                  formik.handleSubmit();
                }}
                className="bg-primary h-[38px] text-white font-semibold rounded-lg shadow hover:scale-105 transition-all duration-200"
                type="primary"
              >
                {phoneNumber.startsWith("+234")
                  ? "Submit & proceed to payment"
                  : t("Submit")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Terms Modal */}
      <Modal
        closable={false}
        keyboard={false}
        footer={null}
        centered
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="flex flex-col min-h-[400px] bg-white rounded-xl p-3 animate-fade-in">
          <h1 className="text-lg font-bold text-primary mb-2">
            Terms and Conditions
          </h1>
          <div className="border-[#9D9DB7] border h-[217px] w-full my-5 overflow-y-scroll p-[10px] rounded bg-silver/30 text-gray-700 text-sm">
            {phoneNumber.startsWith("+212") ? (
              <p className="text-justify">
                <span>{t("termsAndConditionsForMorocco")}</span>
              </p>
            ) : (
              <p className="text-justify">
                <span>
                  Welcome to Nigeria-Morocco Business Week! By proceeding with
                  the registration process, you agree to the following terms and
                  conditions:
                </span>
                Registration Information: <br />
                1.1 You must provide accurate and complete information during
                the registration process. <br />
                1.2 You are responsible for maintaining the confidentiality of
                your account credentials and for all activities that occur under
                your account. <br />
                <span>Data Collection and Use: </span>
                2.1 We collect personal information such as your name, email
                address, and other relevant details for registration and
                communication purposes. <br />
                2.2 Your data may be shared with third parties for specific
                purposes such as marketing, analytics, or service provision. We
                will not sell or rent your personal information to third parties
                without your explicit consent.
                <br />
                2.3 We may collect non-personal information such as browser
                type, IP address, and usage patterns to improve our services and
                user experience.
                <br />
                <span>Cookies and Tracking:</span>
                3.1 We use cookies and similar technologies to enhance your
                browsing experience and track usage patterns.
                <br />
                3.2 By using our website, you consent to the use of cookies and
                tracking technologies as described in our Privacy Policy.
                <br />
                <span>Content Submission:</span>
                4.1 You are solely responsible for any content you submit or
                upload to the website.
                <br />
                4.2 By submitting content, you grant us a non-exclusive,
                royalty-free, perpetual, irrevocable, and worldwide license to
                use, reproduce, modify, adapt, publish, translate, distribute,
                and display such content.
                <br />
                <span>Intellectual Property:</span>
                5.1 All content and materials on the website, including but not
                limited to text, graphics, logos, and software, are owned or
                licensed by us and are protected by intellectual property laws.
                <br />
                5.2 You may not use, reproduce, modify, or distribute any
                content from the website without our prior written consent.
                <br />
                <span>Disclaimer of Warranties:</span>
                6.1 We strive to provide accurate and up-to-date information,
                but we do not warrant the completeness, reliability, or accuracy
                of the content on the website.
                <br />
                6.2 Your use of the website is at your own risk, and we disclaim
                all warranties, express or implied, including but not limited to
                warranties of merchantability, fitness for a particular purpose,
                and non-infringement.
                <br />
                <span>Limitation of Liability:</span>
                7.1 We shall not be liable for any direct, indirect, incidental,
                consequential, or punitive damages arising out of your use or
                inability to use the website.
                <br />
                7.2 Our total liability to you for any claims arising from or
                related to the website shall not exceed the amount paid by you,
                if any, for accessing the website.
                <br />
                <span>Indemnification:</span>
                8.1 You agree to indemnify and hold us harmless from any claims,
                losses, liabilities, damages, costs, and expenses arising out of
                your use of the website or violation of these terms and
                conditions.
                <br />
                Governing Law: 9.1 These terms and conditions shall be governed
                by and construed in accordance with the laws of Nigeria and
                Morocco.
                <br />
                9.2 Any disputes arising out of or related to these terms and
                conditions shall be subject to the exclusive jurisdiction of the
                courts in Nigeria and Morocco.
                <br />
                <span>Changes to Terms:</span>
                10.1 We reserve the right to modify or update these terms and
                conditions at any time without prior notice.
                <br />
                10.2 Your continued use of the website after such changes
                constitutes your acceptance of the modified terms.
                <br />
                <span>
                  Please review these terms and conditions carefully before
                  proceeding with the registration process. If you do not agree
                  with any part of these terms, please do not proceed further.
                  If you have any questions or concerns, please contact us at
                  info@spectre.com.
                </span>
                <span>
                  By clicking "I Agree" or similar buttons, you acknowledge that
                  you have read, understood, and agreed to these terms and
                  conditions.
                </span>
              </p>
            )}
          </div>
          <div className="my-3 flex items-center">
            <Checkbox
              onChange={(e) => setIsChecked(e.target.checked)}
              checked={isChecked}
            >
              {t("accept")}
            </Checkbox>
          </div>
          <div className="flex gap-4 items-center justify-end mt-5">
            <Button
              onClick={() => navigate("/")}
              className="border-primary bg-transparent text-primary h-[38px] hover:bg-primary/10 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              disabled={!isChecked}
              onClick={handleCancel}
              className="bg-primary h-[38px] text-white font-semibold rounded-lg shadow hover:scale-105 transition-all duration-200"
              type="primary"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <PaymentSumarryModal
        email={email}
        id={userId}
        isOpened={openSummary}
        handleClose={closeSummary}
      />
    </div>
  );
}
