import { Button, Input } from 'antd';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useLogin from './hooks/useLogin';

import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
export default function Login() {
  const { loading, login } = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const loggedIn = await login(values);
      if (loggedIn) {
        dispatch(
          setUser({
            firstName: loggedIn.data.user.firstName,
            lastName: loggedIn.data.user.lastName,
            email: loggedIn.data.user.email,
            token: loggedIn.data.user.token,
            role: loggedIn.data.user.role,
          })
        );
        navigate('/dashboard');
      }
    },
  });
  const { email, password } = formik.values;
  const { handleChange, handleSubmit } = formik;
  return (
    <div className="bg-silver flex justify-center items-center w-full h-[100vh]">
      <div
        style={{
          background:
            'linear-gradient(#ffffffcf, #ffffffd1) no-repeat center/cover, url(flags.png) no-repeat center/contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        className="flex flex-col p-5 bg-white h-[70%] w-[90%] md:w-[40%] shadow">
        <div className="w-[80%] ml-auto mr-auto h-full flex flex-col items-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-lightGreen text-white mr-auto mt-10">
            Back To Home
          </Button>
          <h1 className="font-bold text-[30px] mt-4  mr-auto">Login</h1>
          <p className="mr-auto">Welcome back</p>
          <div className="w-[100%]">
            <Input
              status={
                formik.touched.email && formik.errors.email ? 'error' : ''
              }
              value={email}
              name="email"
              onChange={handleChange}
              className="h-[49px] w-[100%] mb-5 mt-10"
              variant="outlined"
              placeholder="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-[red] text-left">{formik.errors.email}</p>
            ) : (
              ''
            )}
          </div>

          <div className="w-[100%]">
            <Input
              status={
                formik.touched.password && formik.errors.password ? 'error' : ''
              }
              value={password}
              name="password"
              onChange={handleChange}
              className="h-[49px] w-[100%] mb-5"
              variant="outlined"
              placeholder="password"
              type="password"
            />

            {formik.touched.password && formik.errors.password ? (
              <p className="text-[red] text-left">{formik.errors.password}</p>
            ) : (
              ''
            )}
          </div>

          <Button
            loading={loading}
            onClick={() => handleSubmit()}
            className="h-[49px] w-[100%] mb-20 bg-lightGreen mt-auto"
            type="primary">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
