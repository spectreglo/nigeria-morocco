import useLoading from '../../../general_hooks/useLoading';
import { httpClient } from '../../../utils/config';
import { InitialValuesProps } from '../Booking';

const useBooking = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const book = async (bodyData: InitialValuesProps) => {
    startLoading();

    try {
      const response = await httpClient.post(`/booking`, bodyData, {
        headers: {
          Accept: 'application/json',
        },
      });
      stopLoading();

      if (response.data.success) {
        console.log(response.data.data);
        return { data: response.data, status: true };
      } else {
        return { data: null, status: false };
      }
    } catch (error) {
      stopLoading();
      return { data: null, status: false };
    }
  };

  return {
    booking: loading,
    book,
  };
};

export default useBooking;
