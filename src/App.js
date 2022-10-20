import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/Login';
import CreateHotel from './components/protected/CreateHotel';
import Dashboard from './components/protected/Dashboard';
import EditHotel from './components/protected/EditHotel';
import HotelDetail from './components/protected/HotelDetail';
import Hotels from './components/protected/Hotels';
import { PrivateRoute } from './components/protected/PrivateRoute';
import EditReservation from './components/protected/reservation/EditReservation';
import Reservations from './components/protected/reservation/Reservations';
import RoomTypes from './components/protected/rooms/RoomTypes';
import ReserveRoom from './components/protected/users/ReserveRoom';
import Users from './components/protected/users/Users';
import Register from './components/Register';
import AuthContextProvider from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Fragment>   
          <Layout />
        </Fragment>
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route exact path='/hotels' element={<PrivateRoute><Hotels /></PrivateRoute>} />
          <Route exact path='/hotel-detail/:hotelid' element={<PrivateRoute><HotelDetail /></PrivateRoute>} />
          <Route exact path='/users' element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route exact path='/reserve-room' element={<PrivateRoute><ReserveRoom /></PrivateRoute>} />
          <Route exact path='/room-types' element={<PrivateRoute><RoomTypes /></PrivateRoute>} />
          <Route exact path='/edit-hotel' element={<PrivateRoute><EditHotel /></PrivateRoute>} />
          <Route exact path='/create-hotel' element={<PrivateRoute><CreateHotel /></PrivateRoute>} />
          <Route exact path='/reservations' element={<PrivateRoute><Reservations /></PrivateRoute>} />
          <Route exact path='/edit-reservation' element={<PrivateRoute><EditReservation /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
