import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ConfigProvider } from 'antd';

import { Suspense } from 'react';

import { Provider } from 'react-redux';
import store from './redux';

import NewLanding from './pages/LandinPage/NewLanding';

function App() {
  return (
    <Suspense fallback="loading">
      <BrowserRouter>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: '#4CAF4F',

                // Alias Token
                colorBgContainer: '#f6ffed',
              },
            }}>
            <Routes>
              <Route path="/" element={<NewLanding />} />
              {/* <Route path="/Register" element={<Register />} />
              <Route path="/Booking" element={<Booking />} />
              <Route path="/Invoice" element={<Invoice />} />
              <Route path="/BookingInvoice" element={<BookingInvoice />} />
              <Route path="/Success" element={<Success />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoutes />}>
                <Route index element={<DashboardHome />} />
                <Route path="user" element={<UserProfile />} />
                <Route path="profile" element={<Profile />} />
                <Route path="users" element={<Users />} />
                <Route path="bookings" element={<Bookings />} />
              </Route> */}
            </Routes>
          </ConfigProvider>
        </Provider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
