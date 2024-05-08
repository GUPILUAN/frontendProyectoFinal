import "./App.css";
import CreateUser from "./components/User/CreateUser";
import ShowUser from "./components/User/ShowUser";
import { Route, Routes } from "react-router-dom";
import EditUser from "./components/User/EditUser";
import User from "./components/User/User";
import Login from "./components/User/Login";
import Slidebar from "./components/Common/Slidebar";
import Home from "./components/Layout/Home";
import ShowCars from "./components/Car/ShowCars";
import CreateBooking from "./components/Booking/CreateBooking";
import ShowBookings from "./components/Booking/ShowBookings";
import CreateCar from "./components/Car/CreateCar";
import Car from "./components/Car/Car";
import OwnCars from "./components/Car/OwnCars";
function App() {
  return (
    <div className="App">
    <Slidebar />
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/show-user" element={<ShowUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings/:carBooked" element={<CreateBooking />} />
        <Route path="/my-bookings" element={<ShowBookings/>} />
        <Route path="/cars" element={<ShowCars />} />
        <Route path="/create-car" element={<CreateCar />} />
        <Route path="/car/:id" element={<Car />} />
        <Route path="/ownCars" element={<OwnCars />} />

      </Routes> 
    </div>
  </div>
  );
}

export default App;
