import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';

import { AxiosResponse } from 'axios';

interface Response extends AxiosResponse {
  data: { success: boolean; msg: string };
}
const useDeleteRecord = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const deleteRecord = async (id: string) => {
    startLoading();

    try {
      const response: Response = await httpClient.delete(`/regiter/${id}`);
      stopLoading();

      if (response.data.success) {
        console.log(response.data, 'delete');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      stopLoading();
      return false;
    }
  };

  return {
    deleting: loading,
    deleteRecord,
  };
};

export default useDeleteRecord;
