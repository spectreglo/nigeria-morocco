import { Button, Skeleton } from 'antd';

import useGetAllBookings from './hooks/useGetAllBookings';

export default function Bookings() {
  //   const navigate = useNavigate();
  const { loading, data } = useGetAllBookings();

  return (
    <div>
      <div className="mt-4 max-w-[80vw] overflow-x-scroll text-[13px]">
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
                Full Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Square Meters
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount($)
              </th>
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
              data.map((record, ind) => {
                const rate = record.personalised
                  ? 2700
                  : record?.mobile?.startsWith('+234')
                  ? 550
                  : 1650;
                return (
                  <tr key={ind.toString()}>
                    <td className="px-6 py-4 whitespace-nowrap">{ind + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.square_meters}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {record?.mobile?.startsWith('+234') ? ' 🇳🇬' : '  🇲🇦'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(
                        rate * Number(record.square_meters.split('Sqm')[0])
                      ).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
