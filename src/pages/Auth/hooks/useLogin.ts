import { message } from 'antd';
import useLoading from '../../../general_hooks/useLoading';
import { httpClient } from '../../../utils/config';
export interface LoginBody {
  email: string;
  password: string;
}

const useLogin = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const login = async (bodyData: LoginBody) => {
    startLoading();

    try {
      const response = await httpClient.post(`/login`, bodyData, {
        headers: {
          Accept: 'application/json',
        },
      });
      stopLoading();
     
      if (response.data.status) {
        message.success('Logged in successfully');
        return { data: response.data, status: true };
      } else {
        return { data: null, status: false };
      }
    } catch (error) {
      stopLoading();
      message.error('An error occurred');
      return { data: null, status: false };
    }
  };

  return {
    loading,
    login,
  };
};

export default useLogin;
