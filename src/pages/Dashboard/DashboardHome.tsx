import { useRef } from "react";
import { Button, Dropdown, MenuProps, Modal, Skeleton, message } from "antd";
import DashboardCard from "./compopnents/DashboardCard";
import Input from "../../components/Input";
import useGetAllRegistration from "./hooks/useGetAllRegistration";
import { useEffect, useState } from "react";
import useGetAllTokens from "./hooks/useGetAllTokens";
import moment from "moment";
import { DownloadTableExcel } from "react-export-table-to-excel";
import useGenerateToken from "./hooks/useGenerateToken";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { truncateText } from "../../utils";

const ITEMS_PER_PAGE = 10;
export default function DashboardHome() {
  const user = useSelector((user: RootState) => user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { tokens, lloadingTokens, setRefresh } = useGetAllTokens(
    user.user.role
  );
  const { generateToken, generating } = useGenerateToken();
  const [revenue, setRevenue] = useState("");
  const [morocco, setMorocco] = useState("");
  const [nigeria, setNigeria] = useState("");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tokenModal, setTokenModal] = useState(false);

  const [email, setEmail] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [filter, setFilter] = useState("");
  const { data, loading } = useGetAllRegistration(filter);
  const conditionalData =
    user.user.role == "morocco_admin"
      ? data.filter((rec) => !rec.mobile.startsWith("+234"))
      : data;
  const totalPages = Math.ceil(conditionalData.length / ITEMS_PER_PAGE);
  const currentCompanies = conditionalData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  console.log("all", totalPages);
  console.log("condi", conditionalData);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showTokenModal = () => {
    setTokenModal(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const closeTokenModal = () => {
    setTokenModal(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data.length) {
      const generated = data.reduce(
        (acc, prev) => acc + Number(prev.payment?.amount | 0),
        0
      );
      const nigerians = data.filter((rec) => rec.mobile.startsWith("+234"));
      const moroccans = data.filter((rec) => !rec.mobile.startsWith("+234"));
      setRevenue(generated.toLocaleString());
      setNigeria(nigerians.length.toString());
      setMorocco(moroccans.length.toString());
    }
  }, [data]);
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: <Button onClick={() => setFilter("")}>All</Button>,
    },
    {
      key: "1",
      label: (
        <Button onClick={() => setFilter("mobile=+234")}>Nigeria 🇳🇬</Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button onClick={() => setFilter("mobile=+212")}>Morocco 🇲🇦</Button>
      ),
    },
  ];
  useEffect(() => {
    if (companyFilter) {
      setFilter(`company_name=${companyFilter}`);
    } else {
      setFilter("");
    }
  }, [companyFilter]);
  return (
    <div className="flex flex-col flex-1 bg-white overflow-y-scroll overflow-x-hidden">
      <h1 className="text-[24px] text-fontColor">
        NIGERIA-MOROCCO BUSINESS WEEK
      </h1>
      {user.user.role == "super_admin" && (
        <div className="flex flex-col  md:flex-row justify-between items-center w-full min-h-[100px] bg-white gap-4">
          <div className="flex w-full md:w-auto flex-col gap-2  md:flex-row items-center md:gap-8">
            {loading && <Skeleton className="w-1/2" loading active />}
            {!loading && (
              <>
                <DashboardCard
                  value={data.length.toString()}
                  color="#009a48bf"
                  label="Total Registered Participant"
                />
                <DashboardCard
                  value2={morocco}
                  value={nigeria}
                  label="Nigeria"
                  label2="Morocco"
                  color="#c1272cb8"
                />
                <DashboardCard
                  value={`₦${revenue}`}
                  label="Revenue Generated"
                  color="#2121219e"
                />
              </>
            )}
          </div>

          <div className="flex-1 h-[290px] w-full md:w-auto bg-silver p-3 pt-6">
            {lloadingTokens && <Skeleton className="w-1/2" loading active />}
            {!lloadingTokens && (
              <h1 className="text-black font-bold text-center">Live codes</h1>
            )}
            {!lloadingTokens &&
              tokens.slice(0, 3).map((token) => (
                <div
                  key={token.reference}
                  className="flex justify-between items-center mt-[30px] w-full"
                >
                  <h1 className="font-bold text-[12px]">
                    {token.reference.split("-")[1]}
                  </h1>
                  <p className="text-fontColor text-[12px]">
                    {token.used ? "Used" : "Not-Used"}
                  </p>
                  <p className="text-fontColor text-[12px]">
                    {moment(token.expire_date).isBefore(moment())
                      ? "Expired"
                      : "Not Expired"}
                  </p>
                </div>
              ))}

            <div className="flex items-center mt-[40px] mb-3 justify-end">
              <Button
                onClick={showModal}
                className="bg-lightGreen text-white h-[32px]"
              >
                Generate New Code
              </Button>
              <Button onClick={showTokenModal} className="ml-3">
                <span className="font-bold">View Codes</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full md:w-1/2 items-center justify-between">
        <h1 className="font-bold">All Participants</h1>
        <div className="flex items-center">
          {user.user.role !== "moroccan_admin" && (
            <>
              <Input
                value={companyFilter}
                onChange={(e) => {
                  setCompanyFilter(e.target.value);
                }}
                style={{ marginTop: 0, marginRight: 10 }}
                className="bg-gray"
                placeholder="Search by company name"
                label=""
                outlined={true}
              />
              <Dropdown trigger={["click"]} menu={{ items }} placement="bottom">
                <Button>
                  {filter && filter.includes("mobile")
                    ? filter == "mobile=+234"
                      ? "Nigeria 🇳🇬"
                      : "Morocco 🇲🇦"
                    : "All"}
                </Button>
              </Dropdown>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 max-w-[80vw] overflow-x-scroll">
        <DownloadTableExcel
          filename="nigeria/morocco_users_data"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button> Export excel </button>
        </DownloadTableExcel>
        <table
          ref={tableRef}
          className="w-full divide-y divide-gray-200 rounded text-[13px]"
        >
          <thead className="bg-silver">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                S/N
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Company Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Designation
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Passport Number/CIN
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Country
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-x-scroll">
            {!loading &&
              conditionalData.map((record, ind) => (
                <tr key={ind.toString()}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ind + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.first_name} {record.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-[20%]">
                    {record.governmental
                      ? record.ministry
                      : record.company_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.passport_number} {record.cin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.mobile.startsWith("+234") ? " 🇳🇬" : "  🇲🇦"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <table className="w-full divide-y divide-gray-200 rounded text-[13px]">
          <thead className="bg-silver">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                S/N
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Company Name
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-x-scroll">
            {loading && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton loading active />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton loading active />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton loading active />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton loading active />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton loading active />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton loading active />
                </td>
              </tr>
            )}
            {!loading &&
              currentCompanies.map((record, ind) => (
                <tr key={ind.toString()}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ind + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.first_name} {record.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-[20%]">
                    {record.governmental
                      ? truncateText(record.ministry)
                      : truncateText(record.company_name)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.mobile.startsWith("+234") ? " 🇳🇬" : "  🇲🇦"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      onClick={() =>
                        navigate("/dashboard/user", {
                          state: {
                            id: record._id,
                          },
                        })
                      }
                      className="h-[30px] items-center flex justify-center"
                    >
                      ...
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>

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
          <h1 className="font-bold mt-5">Enter Email To Generate Code</h1>
          <Input
            outlined
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="sample@mail.com"
          />

          <div className="mt-[auto] ml-[auto] flex gap-4">
            <Button className="h-[40px]">Cancel</Button>
            <Button
              loading={generating}
              onClick={async () => {
                if (email) {
                  const generated = await generateToken(email);
                  if (generated) {
                    message.success("Generated token for " + email);
                    setRefresh((prev) => prev + 1);
                  } else {
                    message.error("Error generating token for " + email);
                  }
                } else {
                  message.warning("Email is required");
                }
              }}
              className="bg-lightGreen h-[40px]"
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
        open={tokenModal}
        onOk={closeTokenModal}
        onCancel={closeTokenModal}
      >
        <div className="flex flex-col min-h-[400px] max-h-[400px] bg-white items-center overflow-y-scroll">
          <h1 className="font-bold mt-5">All Generated Tokens</h1>
          {lloadingTokens && <Skeleton className="w-1/2" loading active />}

          {!lloadingTokens &&
            tokens.map((token) => (
              <div
                key={token.reference}
                className="flex justify-between items-center mt-[30px] w-full"
              >
                <h1 className="font-bold text-[10px] w-[35%] text-justify">
                  {token.reference}
                </h1>
                <p className="text-fontColor text-[10px] w-[15%] text-center">
                  {token.used ? "Used" : "Not-Used"}
                </p>
                <p className="text-fontColor text-[10px] w-[25%] text-center">
                  {moment(token.expire_date).isBefore(moment())
                    ? "Expired"
                    : "Not Expired"}
                </p>

                <p className="text-fontColor text-[10px] w-[25%] text-center">
                  {token.email}
                </p>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}
