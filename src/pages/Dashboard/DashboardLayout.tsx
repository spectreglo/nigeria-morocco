import { Link, Outlet, useLocation } from 'react-router-dom';
import DashbordIcon from './compopnents/DashbordIcon';
import ProfileIcon from './compopnents/ProfileIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import UsersIcon from './compopnents/UsersIcon';

export default function DashboardLayout() {
  const location = useLocation();
  const user = useSelector((user: RootState) => user.user);
  return (
    <div className="flex h-[100vh] w-[100vw] bg-white overflow-x-hidden">
      <div className="hidden md:w-[15%] md:flex flex-col h-full bg-[#F2F2F2] py-20 px-5">
        <h1 className="text-[12px] md:text-[14px] font-bold text-center mb-32">
          🇳🇬 NIGERIA-MOROCCO 🇲🇦
        </h1>
        <Link to="/dashboard">
          <div
            className={`w-full h-[40px] ${
              location.pathname == '/dashboard' ||
              location.pathname == '/dashboard/user'
                ? 'bg-lightGreen'
                : 'bg-transparent'
            } flex items-center px-3 rounded-md justify-center cursor-pointer transition-all`}>
            <DashbordIcon
              color={
                location.pathname == '/dashboard' ||
                location.pathname == '/dashboard/user'
                  ? 'white'
                  : '#808080'
              }
            />
            <h1
              className={`w-[80%]  ${
                location.pathname == '/dashboard' ||
                location.pathname == '/dashboard/user'
                  ? 'text-white'
                  : 'text-[#808080]'
              } text-[14px]  ml-3`}>
              Dashboard
            </h1>
          </div>
        </Link>

        <Link to="/dashboard/profile">
          <div
            className={`w-full h-[40px] ${
              location.pathname == '/dashboard/profile'
                ? 'bg-lightGreen'
                : 'bg-transparent'
            } flex items-center px-3 rounded-md justify-center cursor-pointer transition-all`}>
            <ProfileIcon
              color={
                location.pathname == '/dashboard/profile' ? 'white' : '#808080'
              }
            />
            <h1
              className={`w-[80%]  ${
                location.pathname == '/dashboard/profile'
                  ? 'text-white'
                  : 'text-[#808080]'
              } text-[14px]  ml-3`}>
              Profile
            </h1>
          </div>
        </Link>

        {user.user.role == 'super_admin' && (
          <Link to="/dashboard/users">
            <div
              className={`w-full h-[40px] ${
                location.pathname == '/dashboard/users'
                  ? 'bg-lightGreen'
                  : 'bg-transparent'
              } flex items-center px-3 rounded-md justify-center cursor-pointer transition-all`}>
              <UsersIcon
                color={
                  location.pathname == '/dashboard/users' ? 'white' : '#808080'
                }
              />
              <h1
                className={`w-[80%]  ${
                  location.pathname == '/dashboard/users'
                    ? 'text-white'
                    : 'text-[#808080]'
                } text-[14px]  ml-3`}>
                Users
              </h1>
            </div>
          </Link>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <div className="bg-white h-[100px] w-full flex items-center justify-end px-10">
          <div className="flex items-center">
            <img src="/start.png" className="w-[40px] h-[40px] rounded-full" />
            <div className=" ml-5">
              <h1 className="text-[14px] text-[#4C4C4C]">
                {' '}
                {user.user.firstName} {user.user.lastName}
              </h1>
              <p className="text-[14px]">{user.user.role}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col p-10">{<Outlet />}</div>
      </div>
    </div>
  );
}
