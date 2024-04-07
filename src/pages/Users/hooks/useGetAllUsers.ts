import { useEffect, useState } from 'react';
import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';

import { AxiosResponse } from 'axios';
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
interface Response extends AxiosResponse {
  data: { data: User[]; success: boolean };
}
const useGetAllUsers = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<User[] | []>([]);
  const [refresh, setRefresh] = useState(0);

  const getRecord = async () => {
    startLoading();

    try {
      const response: Response = await httpClient.get(`/all_users`);
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

export default useGetAllUsers;
