import useLoading from '../../../general_hooks/useLoading';
import { InitialValuesProps } from '../Register';
import { httpClient } from '../../../utils/config';
import { notification } from 'antd';

const useRegister = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const register = async (bodyData: InitialValuesProps) => {
    startLoading();

    try {
      const response = await httpClient.post(`/register`, bodyData, {
        headers: {
          Accept: 'application/json',
        },
      });
      stopLoading();

      if (response.data.success) {
        console.log(response.data);
        return { data: response.data.id, status: true };
      } else {
        return { data: null, status: false };
      }
    } catch (error: any) {
      stopLoading();

      notification.error({
        message: error?.response?.data?.message,
      });
      return { data: null, status: false };
    }
  };

  return {
    registering: loading,
    register,
  };
};

export default useRegister;
