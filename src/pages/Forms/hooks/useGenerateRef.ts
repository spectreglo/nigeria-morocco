import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';

const useGenerateRef = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const generateRef = async (id: string, bodyData: { method: string }) => {
    startLoading();

    try {
      const response = await httpClient.put(`/initialize/${id}`, bodyData, {
        headers: {
          Accept: 'application/json',
        },
      });

      stopLoading();
      if (response.data.success) {
        return { data: response.data.data };
      }
    } catch (error) {
      stopLoading();
    }
  };

  return {
    generating: loading,
    generateRef,
  };
};

export default useGenerateRef;
