import { Skeleton } from 'antd';

import useGetAllBookings from './hooks/useGetAllBookings';
import { RootState } from '../../redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const ITEMS_PER_PAGE = 10;
export default function Bookings() {
  //   const navigate = useNavigate();
  const user = useSelector((user: RootState) => user.user);
  const { loading, data } = useGetAllBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const conditionalData =
    user.user.role == 'morocco_admin'
      ? data.filter((rec) => !rec?.mobile?.startsWith('+234'))
      : data;
  const totalPages = Math.ceil(conditionalData.length / ITEMS_PER_PAGE);
  const currentCompanies = conditionalData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
              currentCompanies.map((record, ind) => {
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
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}>
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
