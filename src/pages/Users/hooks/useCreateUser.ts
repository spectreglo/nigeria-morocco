import { message } from 'antd';
import useLoading from '../../../general_hooks/useLoading';
import { httpClient } from '../../../utils/config';
export interface User {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
}
const useCreateUser = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const createUser = async (bodyData: User) => {
    startLoading();

    try {
      const response = await httpClient.post(`/signup`, bodyData, {
        headers: {
          Accept: 'application/json',
        },
      });
      stopLoading();

      if (response.data.status) {
        message.success('Created successfully');
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
    creating: loading,
    createUser,
  };
};

export default useCreateUser;
