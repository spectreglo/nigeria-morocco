import { useEffect, useState } from 'react';
import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';
import { message } from 'antd';
import { AxiosResponse } from 'axios';
interface Payment {
  amount: string;
  method: string;
  reference: string;
  date: string;
}
interface Record {
  company_name: string;
  creation_date: Date;
  address: string;
  number_of_employees?: string;
  website: string;
  mobile: string;
  email: string;
  company_niche: string[];
  import_morocco: string;
  export_morocco: string;
  meeting_sectors: string[];
  image_url: string[];
  qr_data: string;
  payment: Payment;
}
interface Response extends AxiosResponse {
  data: { data: Record; success: boolean };
}
const useVerifyTransaction = (id: string) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<Record | null>(null);

  const verifyTransaction = async () => {
    startLoading();

    try {
      const response: Response = await httpClient.get(`/verify/${id}`, {
        headers: {
          Accept: 'application/json',
        },
      });

      stopLoading();
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      message.error('Error while Verifying');
      stopLoading();
    }
  };
  useEffect(() => {
    verifyTransaction();
  }, []);
  return {
    verifying: loading,
    verifyTransaction,
    data: data,
  };
};

export default useVerifyTransaction;
