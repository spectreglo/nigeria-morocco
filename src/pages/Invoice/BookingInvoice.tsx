import { useLocation, useNavigate } from 'react-router-dom';
import useVerifyBooking from '../Forms/hooks/useVerifyBooking';

import { Button, Skeleton } from 'antd';
export default function BookingInvoice() {
  const location = useLocation();
  const { verifying } = useVerifyBooking(location.state.id);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center">
      {verifying ? (
        <Skeleton loading active style={{ width: '100%' }} />
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <img src="gif.gif" className="h-[50px] w-[50px]" />
          <h1 className="my-[20px]">Succesfully Booked A Space!</h1>
          <p className=" text-fontColor">Can't wait to see you there</p>
          <Button
            onClick={() => navigate('/')}
            className="bg-lightGreen text-white w-1/2 my-5">
            Back to home
          </Button>
        </div>
      )}
    </div>
  );
}
