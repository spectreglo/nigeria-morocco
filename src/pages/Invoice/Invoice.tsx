import { useLocation, useNavigate } from 'react-router-dom';
import useVerifyTransaction from '../Forms/hooks/useVerifyTransaction';
import { Button, Spin } from 'antd';

import { useReactToPrint } from 'react-to-print';

import moment from 'moment';
import { useRef } from 'react';

export default function Invoice() {
  const location = useLocation();
  const { verifying, data } = useVerifyTransaction(location.state.id);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current!,
  });
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100vh] w-full bg-white items-center justify-center">
      <div className="h-[756px] w-[95%]  md:w-[40%] bg-[#F2F2F2] flex flex-col p-2">
        {verifying && (
          <div className="flex-1 h-[100vh] w-full flex flex-col items-center justify-center">
            <Spin spinning size="large" />
            <p>Verifying Transaction</p>
          </div>
        )}
        {!verifying && data && (
          <div ref={componentRef}>
            <h1
              onClick={() => console.log(data)}
              className="text-black text-xl font-bold">
              Invoice Ref
            </h1>
            <h1
              onClick={() => console.log(data)}
              className="text-black text-[12px] font-bold">
              {data.payment.reference}
            </h1>
            <div className="flex justify-between items-center my-5">
              <div>
                <span className="text-[#404955] text-[12px] mb-2">
                  Issued On
                </span>
                <h1 className="text-black text-[16px] font-bold">
                  {moment(data.payment.date).format('DD-MM-YYYY')}
                </h1>
              </div>

              <div>
                <span className="text-[#404955] text-[12px] mb-2">
                  Payment Method
                </span>
                <h1 className="text-black text-[16px] font-bold">
                  {data.payment.method}
                </h1>
              </div>
            </div>

            <div className="mt-10">
              <span className="text-[#404955] text-[12px] mb-2">Billed to</span>
              <h1 className="text-black text-[16px] font-bold">
                {data.company_name}
              </h1>
              <h1 className="text-[#404955] text-[16px]">{data.email}</h1>

              <h1 className="text-[#404955] text-[16px] mt-4">
                {data.address}
              </h1>
            </div>

            <div className="flex flex-col flex-1 bg-white p-5 mt-4">
              <h1 className="text-black text-[16px] font-bold mt-8">
                Invoice Details
              </h1>
              <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-4">
                <h1>Item</h1>
                <span>Amount</span>
              </div>

              <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-4">
                <h1>Registration fee</h1>
                <span>₦{data.payment.amount}</span>
              </div>
              <img
                src={data.qr_data}
                className="h-[85px] w-[85px] ml-[auto] mr-[auto] mt-[auto] mb-5"
              />
            </div>
            <div className="flex items-center justify-between  py-4">
              <h1>Total Item Payed</h1>
              <span>₦{data.payment.amount}</span>
            </div>
          </div>
        )}

        {!verifying && data && (
          <>
            <Button
              onClick={handlePrint}
              className="bg-lightGreen"
              type="primary">
              Print
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="bg-blue-700 mt-4"
              type="primary">
              Home
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
