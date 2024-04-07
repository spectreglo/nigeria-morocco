import { Button, Modal, message } from 'antd';
import PaymentType from './PaymentType';
import { useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { useEffect, useState } from 'react';
import useGenerateRef from '../hooks/useGenerateRef';
import useRegistrationToken from '../hooks/useRegistrationToken';
import Input from '../../../components/Input';
interface IProps {
  isOpened: boolean;
  handleClose: () => void;
  id: string;
  email: string;
}

export default function PaymentSumarryModal({
  isOpened,
  handleClose,
  id,
  email,
}: IProps) {
  const [ref, setRef] = useState('');
  const [active, setActive] = useState(0);
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState('');
  const { registering, registerToken } = useRegistrationToken();
  const { generateRef, generating } = useGenerateRef();
  const onSuccess = () => {
    setAmount(0);
    setRef('');
    message.success('Payment Successfull');
    navigate('/Invoice', {
      state: { id },
    });
    handleClose();
  };

  // you can call this function anything
  const onClose = () => {
    message.error('Payment Failed');
  };
  const makePayment = usePaystackPayment({
    reference: ref,
    email,
    amount, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_acd82313c5945d37a69e9e06195f153984cc70e0',
  });
  const Buttons = [
    { title: 'Paystack', image: 'paystack.png', value: 'PAYSTACK' },
    { title: 'Use Code', image: 'num.png', value: 'CODE' },
  ];

  useEffect(() => {
    // This effect will run every time `amount` or `ref` changes
    if (amount !== 0 && ref !== '') {
      // If both `amount` and `ref` have been set, make the payment
      makePayment(onSuccess, onClose);
    }
  }, [amount, ref]);
  const navigate = useNavigate();
  return (
    <Modal
      footer={false}
      centered
      title=""
      onCancel={handleClose}
      open={isOpened}
      onOk={handleClose}>
      <div className="flex flex-col min-h-[450px] bg-white">
        <div className="h-[75px] bg-[#F2F2F2] w-full flex items-center pl-3">
          <h1 className="italic text-[#7A8599]">Payment History</h1>
        </div>
        <div className="h-[148px] w-full bg-white p-3">
          <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-4">
            <h1>Item</h1>
            <span>Amount to pay</span>
          </div>

          <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-4">
            <h1>Registration fee</h1>
            <span>₦2,000</span>
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-[#F2F2F2] p-3">
          <span className="text-[#7A8599] text-[12px]">
            Select payment method
          </span>
          <div className="flex flex-col md:flex-row gap-3 items-center mt-3">
            {Buttons.map((methods, index) => (
              <PaymentType
                onClick={() => setActive(index)}
                checked={index == active}
                image={methods.image}
                title={methods.title}
                key={index.toString()}
              />
            ))}
          </div>
          {Buttons[active].value == 'CODE' && (
            <Input
              outlined
              placeholder="Enter Token"
              onChange={(e) => setToken(e.target.value)}
              label="Provide Token"
            />
          )}
          <Button
            loading={generating || registering}
            onClick={async () => {
              if (Buttons[active].value == 'CODE') {
                if (token) {
                  const verrified = await registerToken(email, token);
                  if (verrified) {
                    message.success('Successfully Payed');
                    handleClose();
                    navigate('/');
                  } else {
                    message.error('Error Making Payment');
                  }
                } else {
                  message.warning('Insert Token');
                }

                return;
              }
              const generated = await generateRef(id, {
                method: Buttons[active].value,
              });
              if (generated) {
                setAmount(Number(generated.data.amount) * 100);
                setRef(generated.data.transaction_ref);
              }
            }}
            type="primary"
            className="bg-lightGreen h-[38px] w-full mt-2 md:mt-[auto] mb-2">
            Make Payment
          </Button>
        </div>
      </div>
    </Modal>
  );
}
