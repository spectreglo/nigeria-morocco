import { Button, Modal, Select, Skeleton } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import useGetAllUsers from './hooks/useGetAllUsers';
import * as Yup from 'yup';
import Input from '../../components/Input';
import { useFormik } from 'formik';
import useCreateUser from './hooks/useCreateUser';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required(),
  lastName: Yup.string().trim().required(),
  email: Yup.string().trim().email().required(),
  password: Yup.string().trim().required(),
  role: Yup.string()
    .trim()
    .oneOf(['admin', 'super_admin', 'morocco_admin'])
    .default('admin'),
});
export default function Users() {
  const user = useSelector((user: RootState) => user.user);
  const { loading, data, setRefresh } = useGetAllUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createUser, creating } = useCreateUser();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'admin',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const created = await createUser(values);
      if (created.status) {
        setRefresh((prev) => prev + 1);
        formik.resetForm();
        handleCancel();
      }
    },
  });
  const { firstName, lastName, email, role, password } = formik.values;
  const { handleChange, handleSubmit } = formik;
  return (
    <div className="flex flex-1 bg-transparent flex-col">
      <div className="h-[140px] w-full bg-[#F5F7FA] flex items-center px-4">
        <h1 className="text-[30px]">All Users</h1>
      </div>

      <div className="flex  flex-1">
        <div className="w-[30%] border-r border-silver flex flex-col items-center">
          <img
            className="h-[150px] w-[150px] rounded-full my-8"
            src="../default.png"
          />
          <h1 className="text-[26px] text-black font-bold capitalize">
            {user.user.firstName} {user.user.lastName}
          </h1>
          <h1 className="text-fontColor uppercase">{user.user.role}</h1>
        </div>

        <div className="flex flex-1 flex-col bg-transparent mx-5">
          <div className="flex items-center justify-between w-full h-[70px] border-b border-silver">
            <h1 className="text-[20px]">Users List</h1>
            <Button
              onClick={showModal}
              type="primary"
              className="bg-lightGreen">
              Add User
            </Button>
          </div>

          <div className="mt-4 max-w-[80vw] overflow-x-scroll">
            <table className="w-full divide-y divide-gray-200 rounded ">
              <thead className="bg-silver">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 overflow-x-scroll">
                {loading && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton loading active />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton loading active />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton loading active />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton loading active />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton loading active />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton loading active />
                    </td>
                  </tr>
                )}
                {!loading &&
                  data.map((record, ind) => (
                    <tr key={ind.toString()}>
                      <td className="px-6 py-4 whitespace-nowrap">{ind + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.firstName} {record.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {record.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          onClick={() => {}}
                          className="h-[30px] items-center flex justify-center bg-red-800 text-white">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        footer={false}
        centered
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div className="flex flex-col min-h-[400px] bg-white">
          <h1 className="font-bold mt-5">Enter User Details</h1>
          <Input
            error={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : ''
            }
            outlined
            value={firstName}
            onChange={handleChange}
            name="firstName"
            label="First Name"
            placeholder="john"
          />
          <Input
            error={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : ''
            }
            outlined
            value={lastName}
            onChange={handleChange}
            name="lastName"
            label="Last Name"
            placeholder="doe"
          />
          <Input
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ''
            }
            outlined
            value={email}
            onChange={handleChange}
            name="email"
            label="Email"
            placeholder="sample@mail.com"
          />

          <Input
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ''
            }
            outlined
            value={password}
            onChange={handleChange}
            name="password"
            label="Password"
            placeholder="passwor must be 8 chars"
          />
          <span className="font-bold mt-4">Role</span>
          <Select
            status={formik.touched.role && formik.errors.role ? 'error' : ''}
            className="mb-4"
            defaultValue={role}
            onChange={(e) => {
              formik.values.role = e;
            }}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'super_admin', label: 'Super Admin' },
              { value: 'morocco_admin', label: 'Morocco Admin' },
            ]}
          />

          <div className="mt-[auto] ml-[auto] flex gap-4">
            <Button className="h-[40px]">Cancel</Button>
            <Button
              loading={creating}
              onClick={async () => handleSubmit()}
              className="bg-lightGreen h-[40px]"
              type="primary">
              Create User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
