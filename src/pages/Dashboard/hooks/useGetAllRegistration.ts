import { useEffect, useState } from 'react';
import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';
import { InitialValuesProps } from '../../Forms/Register';
import { AxiosResponse } from 'axios';
interface ValuesWithPayment extends InitialValuesProps {
  payment: { status: string; amount: number };
  _id: string;
}
interface Response extends AxiosResponse {
  data: { data: ValuesWithPayment[]; success: boolean };
}
const useGetAllRegistration = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<ValuesWithPayment[] | []>([]);
  const [refresh, setRefresh] = useState(0);

  const getRecord = async () => {
    startLoading();

    try {
      const response: Response = await httpClient.get(`/register`);
      stopLoading();

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      stopLoading();
    }
  };

  useEffect(() => {
    getRecord();
  }, [refresh]);
  return {
    loading,
    getRecord,
    data,
    setRefresh,
  };
};

export default useGetAllRegistration;
