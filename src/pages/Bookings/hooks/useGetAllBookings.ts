import { useEffect, useState } from 'react';
import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';
import { AxiosResponse } from 'axios';

interface Booking {
  creation_date?: Date;
  email?: string;
  space?: string;
  mobile?: string;
  name?: string;
  full_name?: string;
  job_title?: string;
  annual_turnover?: string;
  sector?: string[];
  personalised?: boolean;
  square_meters: string;
  personal_meters?: string;
  _id: string;
}
interface Response extends AxiosResponse {
  data: { data: Booking[]; success: boolean };
}
const useGetAllBookings = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<Booking[] | []>([]);
  const [refresh, setRefresh] = useState(0);

  const getBookings = async () => {
    startLoading();

    try {
      const response: Response = await httpClient.get(`/booking`);
      stopLoading();

      if (response.data.success) {
        console.log(response.data);
        setData(response.data.data);
      }
    } catch (error) {
      stopLoading();
    }
  };

  useEffect(() => {
    getBookings();
  }, [refresh]);
  return {
    loading,
    getBookings,
    data,
    setRefresh,
  };
};

export default useGetAllBookings;
