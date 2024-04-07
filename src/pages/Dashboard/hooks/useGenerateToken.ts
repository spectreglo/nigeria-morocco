import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';

const useGenerateToken = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const generateToken = async (email: string) => {
    startLoading();

    try {
      const response = await httpClient.get(`/generate_code/${email}`);
      stopLoading();

      if (response.data.success) {
        return true;
      } else {
        console.log(response.data);
        return false;
      }
    } catch (error) {
      alert(error);
      return false;
    }
  };

  return {
    generating: loading,
    generateToken,
  };
};

export default useGenerateToken;
