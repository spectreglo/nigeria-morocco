import { useLocation, useNavigate } from "react-router-dom";
import useGetDetails from "../hooks/useGetDetails";
import { Skeleton, Button } from "antd";

import AntTextArea from "../../../components/TextArea";
import DeleteIcon from "../compopnents/DeleteIcon";
import useDeleteRecord from "../hooks/useDeleteRecord";
import html2pdf from "html2pdf.js"; // you can also use react-to-print

export default function UserProfile() {
  const location = useLocation();
  const { loading, data } = useGetDetails(location.state.id);
  const { deleteRecord, deleting } = useDeleteRecord();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this record?");
    if (confirmed) {
      const deleted = await deleteRecord(location.state.id);
      if (deleted) {
        navigate("/dashboard");
      }
    }
  };

  async function printEventPassMember() {
    const element = document.querySelector("#event-pass-member");
    html2pdf(element);
  }
  async function printEventPassVIP() {
    const element = document.querySelector("#event-pass-vip");
    html2pdf(element);
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm py-6 px-8 flex items-center justify-between">
        <h1
          onClick={() => console.log(data)}
          className="text-2xl font-semibold text-gray-800 cursor-pointer"
        >
          User Details
        </h1>

        <span onClick={handleDelete} className="cursor-pointer">
          <DeleteIcon />
        </span>
      </div>

      {/* Loading State */}
      {(loading || deleting) && (
        <Skeleton className="mx-8 my-6 w-1/2" loading active />
      )}

      {/* Main Content */}
      {!loading && !deleting && (
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md m-8 p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
            <img
              className="h-36 w-36 rounded-full shadow-lg object-cover"
              src={data?.image_url ? data.image_url : "../default.png"}
              alt="Profile"
            />
            <h1 className="text-xl font-bold mt-4 text-gray-900 text-center">
              {data?.company_name}{" "}
              {data?.mobile.startsWith("+234") ? "🇳🇬" : "🇲🇦"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">{data?.mobile}</p>
            <img
              className="h-28 w-28 mt-6 shadow-md"
              src={data?.qr_data}
              alt="QR Code"
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col p-6 space-y-6">
            {/* Registration Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-300">
                Registration Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4">
                <div>
                  <p className="text-gray-500">Organization/Company</p>
                  <h3 className="font-medium text-gray-800">
                    {data?.governmental ? data?.ministry : data?.company_name}
                  </h3>
                </div>
                <div>
                  <p className="text-gray-500">Date Of Creation</p>
                  <h3 className="font-medium text-gray-800">
                    {data?.creation_date}
                  </h3>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-300">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4">
                <div>
                  <p className="text-gray-500">Full Name</p>
                  <h3 className="font-medium text-gray-800">
                    {data?.first_name} {data?.last_name}
                  </h3>
                </div>
                <div>
                  <p className="text-gray-500">Designation</p>
                  <h3 className="font-medium text-gray-800">
                    {data?.designation}
                  </h3>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-300">
                Company Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4">
                <div>
                  <p className="text-gray-500">Number Of Employees</p>
                  <h3 className="font-medium text-gray-800">
                    {data?.number_of_employees}
                  </h3>
                </div>
                <div>
                  <p className="text-gray-500">Address</p>
                  <h3 className="font-medium text-gray-800">{data?.address}</h3>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Email</p>
                <h3 className="font-medium text-gray-800">{data?.email}</h3>
              </div>
              <div>
                <p className="text-gray-500">Website</p>
                <h3 className="font-medium text-gray-800">{data?.website}</h3>
              </div>
            </div>

            {/* Additional Info */}
            <AntTextArea
              outlined={true}
              value={data?.meeting_sectors.join(", ")}
              label="Sectors for B2B"
              className="mt-6"
            />
            <AntTextArea
              outlined={true}
              value={data?.import_morocco}
              label="Import from Morocco"
              className="mt-4"
            />
            <AntTextArea
              outlined={true}
              value={data?.export_morocco}
              label="Export to Morocco"
              className="mt-4"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-1/2 items-center">
          <Button
            onClick={() => {
              printEventPassMember();
            }}
            className="bg-primary h-[38px] w-[50%]"
            type="primary"
          >
            Download Member Pass
          </Button>
          <div
            className="bg-white rounded-lg text-center w-[50%] m-auto my-[50px] border-2 border-primary"
            id="event-pass-member"
          >
            <img
              src="../bweek.jpg"
              alt=""
              className="h-30 w-full object-cover content-center rounded-t-lg"
            />
            <div className="flex justify-center">
              <img
                src={data?.image_url ? data.image_url : "../default.png"}
                alt=""
                className="w-20 h-20 rounded-full object-cover content-center -mt-10 border-4 border-white"
              />
            </div>
            <div
              style={{
                background:
                  "linear-gradient(#ffffffcf, #ffffffd1) no-repeat center/cover, url(../flags.png) no-repeat center/contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <h1 className="text-center font-bold tracking-wider text-2xl text-gray-800 mt-4">
                {data?.first_name} {data?.last_name}
              </h1>
              <p className="text-gray-500 mt-1 text-center">
                {data?.company_name}
              </p>
              <br />
              <button className="bg-primary w-[100px] py-2 px-4 rounded-full text-white text-sm font-semibold">
                Member
              </button>

              <div className="mt-5 flex flex-col items-center mx-auto mb-5">
                <h1 className="text-primary font-bold">
                  Nigeria Morocco Business Week 2024
                </h1>
                <p>October 29th-31st, 2024</p>
                <p className="text-3xl text-gray-800 text-center">
                  {" "}
                  <img
                    className="h-28 w-28 mt-6 shadow-md"
                    src={data?.qr_data}
                    alt="QR Code"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:w-1/2 items-center">
          <Button
            onClick={() => {
              printEventPassVIP();
            }}
            className="bg-primary h-[38px] w-[50%]"
            type="primary"
          >
            Download VIP Pass
          </Button>
          <div
            className="bg-white rounded-lg text-center w-[50%] m-auto my-[50px] border-2 border-primary"
            id="event-pass-vip"
          >
            <img
              src="../bweek.jpg"
              alt=""
              className="h-30 w-full object-cover content-center rounded-t-lg"
            />
            <div className="flex justify-center">
              <img
                src={data?.image_url ? data.image_url : "../default.png"}
                alt=""
                className="w-20 h-20 rounded-full object-cover content-center -mt-10 border-4 border-white"
              />
            </div>
            <div
              style={{
                background:
                  "linear-gradient(#ffffffcf, #ffffffd1) no-repeat center/cover, url(../flags.png) no-repeat center/contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <h1 className="text-center font-bold tracking-wider text-2xl text-gray-800 mt-4">
                {data?.first_name} {data?.last_name}
              </h1>
              <p className="text-gray-500 mt-1 text-center">
                {data?.company_name}
              </p>
              <br />
              <button className="bg-cardRed w-[100px] py-2 px-4 rounded-full text-white text-sm font-semibold">
                VIP
              </button>

              <div className="mt-5 flex flex-col items-center mx-auto mb-5">
                <h1 className="text-primary font-bold">
                  Nigeria Morocco Business Week 2024
                </h1>
                <p>October 29th-31st, 2024</p>
                <p className="text-3xl text-gray-800 text-center">
                  {" "}
                  <img
                    className="h-28 w-28 mt-6 shadow-md"
                    src={data?.qr_data}
                    alt="QR Code"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
