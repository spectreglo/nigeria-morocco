import { useLocation } from 'react-router-dom';
import useGetDetails from '../hooks/useGetDetails';
import { Skeleton } from 'antd';

import moment from 'moment';
import AntTextArea from '../../../components/TextArea';

export default function UserProfile() {
  const location = useLocation();
  const { loading, data } = useGetDetails(location.state.id);
  return (
    <div className="flex flex-1 bg-transparent flex-col">
      <div className="h-[140px] w-full bg-[#F5F7FA] flex items-center px-4">
        <h1 onClick={() => console.log(data)} className="text-[30px]">
          User Details
        </h1>
      </div>
      {loading && <Skeleton className="w-1/2" loading active />}

      {!loading && (
        <div className="flex  flex-1">
          <div className="w-[30%] border-r border-silver flex flex-col items-center">
            <img
              className="h-[150px] w-[150px] rounded-full my-8"
              src="../default.png"
            />
            <h1 className="text-[26px] text-black font-bold capitalize">
              {data?.company_name}{' '}
              {data?.mobile.startsWith('+234') ? ' 🇳🇬' : '  🇲🇦'}
            </h1>
            <h1 className="text-fontColor uppercase">{data?.mobile}</h1>
          </div>

          <div className="flex flex-1 flex-col bg-transparent mx-5 gap-4">
            <div className="flex items-center justify-between w-full h-[70px] border-b border-silver">
              <h1 className="text-[20px]">Registration Info</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="font-bold text-[20px] text-black">
                  {data?.company_niche.map((ni) => `${ni} `)}
                </h1>
                <span>Company Niche</span>
              </div>

              <div>
                <h1 className="font-bold text-[20px] text-black">
                  {moment(data?.creation_date).format('YYYY-MM-DD')}
                </h1>
                <span>Date Of Creation</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="font-bold text-[20px] text-black">
                  {data?.number_of_employees}
                </h1>
                <span>Number Of Employees</span>
              </div>

              <div>
                <h1 className="font-bold text-[20px] text-black">
                  {data?.address}
                </h1>
                <span>Address</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="font-bold text-[20px] text-black">
                  {data?.email}
                </h1>
                <span>Email</span>
              </div>

              <div>
                <h1 className="font-bold text-[20px] text-black">
                  {data?.website}
                </h1>
                <span>Website</span>
              </div>
            </div>
            <AntTextArea
              outlined={true}
              value={data?.meeting_sectors
                .map((meeting) => `${meeting},`)
                .join()}
              label="Sector for B2B"
            />
            <AntTextArea
              outlined={true}
              value={data?.import_morocco}
              label="Import from Morocco"
            />
            <AntTextArea
              outlined={true}
              value={data?.export_morocco}
              label="Export To Morocco"
            />
          </div>
        </div>
      )}
    </div>
  );
}
