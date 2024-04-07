import useLoading from '../../../general_hooks/useLoading';

import { httpClient } from '../../../utils/config';

const useRegistrationToken = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const registerToken = async (email: string, token: string) => {
    startLoading();

    try {
      const response = await httpClient.get(
        `/verify_token/${email}/${token}/true`
      );
      stopLoading();

      if (response.data.success) {
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
    registering: loading,
    registerToken,
  };
};

export default useRegistrationToken;
