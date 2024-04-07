import { Button, Modal, Skeleton, message } from 'antd';
import DashboardCard from './compopnents/DashboardCard';
import Input from '../../components/Input';
import useGetAllRegistration from './hooks/useGetAllRegistration';
import { useEffect, useState } from 'react';
import useGetAllTokens from './hooks/useGetAllTokens';
import moment from 'moment';
import useGenerateToken from './hooks/useGenerateToken';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

export default function DashboardHome() {
  const user = useSelector((user: RootState) => user.user);
  const { data, loading } = useGetAllRegistration();
  const { tokens, lloadingTokens, setRefresh } = useGetAllTokens(
    user.user.role
  );
  const { generateToken, generating } = useGenerateToken();
  const [revenue, setRevenue] = useState('');
  const [morocco, setMorocco] = useState('');
  const [nigeria, setNigeria] = useState('');
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tokenModal, setTokenModal] = useState(false);

  const [email, setEmail] = useState('');

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
      const nigerians = data.filter((rec) => rec.mobile.startsWith('+234'));
      const moroccans = data.filter((rec) => !rec.mobile.startsWith('+234'));
      setRevenue(generated.toLocaleString());
      setNigeria(nigerians.length.toString());
      setMorocco(moroccans.length.toString());
    }
  }, [data]);
  return (
    <div className="flex flex-col flex-1 bg-white overflow-y-scroll overflow-x-hidden">
      <h1 className="text-[24px] text-fontColor">
        NIGERIA-MOROCCO BUSINESS WEEK
      </h1>
      {user.user.role == 'super_admin' && (
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
                  className="flex justify-between items-center mt-[30px] w-full">
                  <h1 className="font-bold text-[12px]">
                    {token.reference.split('-')[1]}
                  </h1>
                  <p className="text-fontColor text-[12px]">
                    {token.used ? 'Used' : 'Not-Used'}
                  </p>
                  <p className="text-fontColor text-[12px]">
                    {moment(token.expire_date).isBefore(moment())
                      ? 'Expired'
                      : 'Not Expired'}
                  </p>
                </div>
              ))}

            <div className="flex items-center mt-[40px] mb-3 justify-end">
              <Button
                onClick={showModal}
                className="bg-lightGreen text-white h-[32px]">
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
          <Input
            style={{ marginTop: 0, marginRight: 10 }}
            className="bg-gray"
            placeholder="Search Results"
            label=""
            outlined={true}
          />
          <Button>Filter</Button>
        </div>
      </div>

      <div className="mt-4 max-w-[80vw] overflow-x-scroll">
        <table className="w-full divide-y divide-gray-200 rounded ">
          <thead className="bg-silver">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S/N
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
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
              data.map((record, ind) => (
                <tr key={ind.toString()}>
                  <td className="px-6 py-4 whitespace-nowrap">{ind + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.company_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.payment?.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.mobile.startsWith('+234') ? ' 🇳🇬' : '  🇲🇦'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      onClick={() =>
                        navigate('/dashboard/user', {
                          state: {
                            id: record._id,
                          },
                        })
                      }
                      className="h-[30px] items-center flex justify-center">
                      ...
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        footer={false}
        centered
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
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
                    message.success('Generated token for ' + email);
                    setRefresh((prev) => prev + 1);
                  } else {
                    message.error('Error generating token for ' + email);
                  }
                } else {
                  message.warning('Email is required');
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
        open={tokenModal}
        onOk={closeTokenModal}
        onCancel={closeTokenModal}>
        <div className="flex flex-col min-h-[400px] max-h-[400px] bg-white items-center overflow-y-scroll">
          <h1 className="font-bold mt-5">All Generated Tokens</h1>
          {lloadingTokens && <Skeleton className="w-1/2" loading active />}

          {!lloadingTokens &&
            tokens.map((token) => (
              <div
                key={token.reference}
                className="flex justify-between items-center mt-[30px] w-full">
                <h1 className="font-bold text-[10px] w-[35%] text-justify">
                  {token.reference}
                </h1>
                <p className="text-fontColor text-[10px] w-[15%] text-center">
                  {token.used ? 'Used' : 'Not-Used'}
                </p>
                <p className="text-fontColor text-[10px] w-[25%] text-center">
                  {moment(token.expire_date).isBefore(moment())
                    ? 'Expired'
                    : 'Not Expired'}
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
