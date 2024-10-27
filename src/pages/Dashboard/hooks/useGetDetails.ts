import { useEffect, useState } from 'react';
import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';

import { AxiosResponse } from 'axios';
interface CompanyData {
  address: string;
  business_sub_sector: string;
  company_name: string;
  company_niche: string[];
  creation_date: string;
  email: string;
  export_morocco: string;
  image_url: string;
  import_morocco: string;
  meeting_sectors: string[];
  mobile: string;
  number_of_employees: string;
  governmental: boolean;
  ministry: string;
  first_name: string;
  last_name: string;
  designation: string;
  qr_data: string;
  payment: {
    method: string;
    status: string;
    reference: string;
    date: string;
  };
  updatedAt: string;
  website: string;
  _id: string;
}
interface Response extends AxiosResponse {
  data: { data: CompanyData; success: boolean };
}
const useGetDetails = (id: string) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<CompanyData | undefined>(undefined);
  const [refresh, setRefresh] = useState(0);

  const getRecord = async () => {
    startLoading();

    try {
      const response: Response = await httpClient.get(`/scan/${id}`);
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

export default useGetDetails;
