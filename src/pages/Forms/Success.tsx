import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';
export default function Success() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center">
        <img src="gif.gif" className="h-[50px] w-[50px]" />
        <h1 className="my-[20px]">Succesfully Registered!</h1>
        <p className=" text-fontColor text-center">
          You Can Now Proceed To Payment Using Below Details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-5">
          <div className="flex flex-col">
            <h1 className="text-[30px]">Nigerian Account 🇳🇬</h1>
            <div className="flex items-center gap-2">
              <h1 className="font-bold">ACCOUNT NAME:</h1>
              <h1>CONSCCIMA</h1>
            </div>

            <div className="flex items-center gap-2">
              <h1 className="font-bold">ACCOUNT NUMBER:</h1>
              <h1>0002225410</h1>
            </div>

            <div className="flex items-center gap-2">
              <h1 className="font-bold">BANK NAME/BRANCH:</h1>
              <h1>UNITY BANK PLC</h1>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-[30px]">Morrocan Account 🇲🇦</h1>
            <div className="flex items-center gap-2">
              <h1 className="font-bold">ACCOUNT NAME:</h1>
              <h1>CONSCCIMA</h1>
            </div>

            <div className="flex items-center gap-2">
              <h1 className="font-bold">ACCOUNT NUMBER:</h1>
              <h1>0002225410</h1>
            </div>

            <div className="flex items-center gap-2">
              <h1 className="font-bold">BANK NAME/BRANCH:</h1>
              <h1>UNITY BANK PLC</h1>
            </div>
          </div>
        </div>
        <Button
          onClick={() => navigate('/')}
          className="bg-lightGreen text-white w-1/2 my-5">
          Back to home
        </Button>
      </div>
    </div>
  );
}
