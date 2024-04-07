import { useEffect, useState } from 'react';
import Input from '../../components/Input';

import { Button, message } from 'antd';

import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useFormik } from 'formik';

import { useTranslation } from 'react-i18next';
import PaymentType from './components/PaymentType';
import { usePaystackPayment } from 'react-paystack';
import useBooking from './hooks/useBooking';

export interface InitialValuesProps {
  company_name: string;

  mobile: string;
  email: string;
  space: string;
}

export default function Booking() {
  const [active, setActive] = useState(0);
  const [ref, setRef] = useState('');
  const [id, setId] = useState('');
  const [amount, setAmount] = useState(0);

  const [email, setEmail] = useState('');

  const { book, booking } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (phoneNumber.startsWith('+234')) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('fr');
    }
  }, []);
  const [phoneNumber] = useState<string>(location.state.phoneNumber);

  const onSuccess = () => {
    setAmount(0);
    setRef('');
    message.success('Payment Successfull');
    navigate('/BookingInvoice', {
      state: { id },
    });
  };

  // you can call this function anything
  const onClose = () => {
    message.error('Payment Failed');
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required('Company name is required'),
    mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    space: Yup.string(),
  });
  const initialValues: InitialValuesProps = {
    company_name: '',
    mobile: phoneNumber,
    email: '',
    space: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const booked = await book(values);
      if (booked.status) {
        setEmail(values.email);
        formik.resetForm();
        // console.log(booked, 'booked');
        setRef(booked.data.data.transaction_ref);
        setAmount(100 * Number(booked.data.data.amount));
        setId(booked.data.data.id);
      }
    },
    validationSchema,
  });

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
      console.log(amount, ref);
      // If both `amount` and `ref` have been set, make the payment
      makePayment(onSuccess, onClose);
    }
  }, [amount, ref]);
  return (
    <div
      // style={{ backgroundImage: 'url(rectangle.png)' }}
      className="bg-cover bg-center h-[100vh] w-full relative overflow-x-hidden">
      <div
        // style={{
        //   backgroundImage: 'url(round.png)',
        //   backgroundRepeat: 'no-repeat',
        // }}
        className="fixed top-0 bottom-0 right-0 left-0 bg-bgImage  bg-contain bg-center flex flex-col items-center p-5 md:p-11 overflow-x-hidden">
        <h1 className="text-lightGreen font-bold text-4xl">{t('Book')}</h1>
        <span>{t('Part')}</span>
        <p className="text-2xl"> {t('Fill')}</p>

        <div className="flex-1 flex-col bg-transparent min-h-[200px] w-full md:w-[70%] mt-5 overflow-x-hidden">
          <span className="text-[18px] text-lightGreen">{t('Personal')}</span>
          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <Input
              error={
                formik.touched.company_name && formik.errors.company_name
                  ? formik.errors.company_name
                  : ''
              }
              value={formik.values.company_name}
              onChange={formik.handleChange}
              id="company_name"
              className="w-full md:w-[70%]"
              required
              label={t('Name')}
              placeholder="Enter the name of the company"
              outlined={false}
            />

            <Input
              error={
                formik.touched.space && formik.errors.space
                  ? formik.errors.space
                  : ''
              }
              value={formik.values.space}
              id="space"
              onChange={formik.handleChange}
              className="w-full md:w-[30%]"
              required
              label={t('Space')}
              placeholder="Enter Booking Space"
              outlined={false}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <Input
              required
              value={phoneNumber}
              disabled
              className="w-full md:w-[30%]"
              label={t('Mobile')}
              outlined={false}
            />

            <Input
              required
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''
              }
              value={formik.values.email}
              id="email"
              onChange={formik.handleChange}
              className="w-full md:w-[70%]"
              label={t('Email')}
              outlined={false}
            />
          </div>

          <div className="h-[75px] bg-[#F2F2F2] w-full flex items-center pl-3">
            <h1 className="italic text-[#7A8599]">Payment History</h1>
          </div>
          <div className="h-[148px] w-full bg-white p-3">
            <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-4">
              <h1>Item</h1>
              <span>Amount to pay</span>
            </div>

            <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-4">
              <h1>Booking fee</h1>
              <span>₦2,000</span>
            </div>
          </div>
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
          <div className="flex gap-4 items-center justify-end mt-10 mb-5">
            <Button className="border-lightGreen bg-transparent text-lightGreen h-[38px]">
              Reset
            </Button>
            <Button
              loading={booking}
              onClick={() => {
                formik.handleSubmit();
              }}
              className="bg-lightGreen h-[38px]"
              type="primary">
              {t('Payment')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
