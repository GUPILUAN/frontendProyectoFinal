import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import { useParams } from "react-router-dom";
import "./Booking.css";

const CreateBooking = () => {
  const navigate = useNavigate();
  const { carBooked } = useParams();
  const createBookingApi = process.env.REACT_APP_API_URL + "/bookings";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState({
    carBooked,
    startingDate: "",
    endingDate: "",
  });

  const handelInput = (event) => {
    
    const { id, value } = event.target;
    setBooking({
      ...booking,
      [id]: value,
    });
    console.log(booking);
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const startingDate = new Date(booking.startingDate);
    const endingDate = new Date(booking.endingDate);

    const token = sessionStorage.getItem("token");

    if (startingDate >= endingDate) {
      alert("Ending date must be greater than starting date.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(createBookingApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully!", data);
        setBooking({
          carBooked,
          startingDate: "",
          endingDate: "",
        });
        navigate("/my-bookings");
      } else {
        const data = await response.json();
        console.error("Form submission failed!");
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Make booking</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="">
          <label htmlFor="startingDate" className="form-label">
            Starting Date
          </label>
          
          <input
            type="date"
            className="form-control"
            id="startingDate"
            name="startingDate"
            value={booking.startingDate}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="endingDate" className="form-label">
            Ending Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endingDate"
            name="endingDate"
            value={booking.endingDate}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;
