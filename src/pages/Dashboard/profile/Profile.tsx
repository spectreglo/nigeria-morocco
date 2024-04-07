import { Button } from 'antd';
import Input from '../../../components/Input';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';

export default function Profile() {
  const user = useSelector((user: RootState) => user.user);
  return (
    <div className="flex flex-1 bg-transparent flex-col">
      <div className="h-[140px] w-full bg-[#F5F7FA] flex items-center px-4">
        <h1 className="text-[30px]">User Profile</h1>
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
            <h1 className="text-[20px]">Profile Info</h1>
            <Button type="primary" className="text-fontColor">
              Edit Profile
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <Input
              className="w-full md:w-[70%]"
              label="FIRST NAME"
              value={user.user.firstName}
              outlined={true}
            />
            <Input
              className="w-full md:w-[70%]"
              value={user.user.lastName}
              label="LAST NAME"
              outlined={true}
            />
          </div>
          <Input
            className="w-full"
            label="EMAIL"
            value={user.user.email}
            outlined={true}
          />

          <Input
            className="w-full"
            label="ROLE"
            value={user.user.role}
            outlined={true}
          />
        </div>
      </div>
    </div>
  );
}
