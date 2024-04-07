import { useEffect, useState } from 'react';
import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';

import { AxiosResponse } from 'axios';
export type TokenType = {
  creation_date: Date;
  email: string;
  reference: string;
  used: boolean;
  expire_date: Date;
};
interface Response extends AxiosResponse {
  data: { data: TokenType[]; success: boolean };
}
const useGetAllTokens = (role: string) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<TokenType[] | []>([]);
  const [refresh, setRefresh] = useState(0);
  const getTokens = async () => {
    startLoading();

    try {
      const response: Response = await httpClient.get(`/generate_code`);
      stopLoading();

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      stopLoading();
    }
  };

  useEffect(() => {
    if (role == 'super_admin') {
      getTokens();
    }
  }, [refresh]);
  return {
    lloadingTokens: loading,
    getTokens,
    tokens: data,
    setRefresh,
  };
};

export default useGetAllTokens;
