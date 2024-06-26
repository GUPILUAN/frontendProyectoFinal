/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowBookings = () => {
  const showBookingsApi = process.env.REACT_APP_API_URL + "/bookings";
  const getCarsApi = process.env.REACT_APP_API_URL + "/cars/car";
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    axios
      .get(showBookingsApi, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const bookingsData = res.data;
        const promises = bookingsData.map((booking) =>
          axios.get(`${getCarsApi}/${booking.carBooked}`)
        );
        Promise.all(promises)
          .then((responses) => {
            const bookingsWithCars = bookingsData.map((booking, index) => ({
              ...booking,
              car: responses[index].data,
            }));
            setBookings(bookingsWithCars);
          })
          .catch((error) =>
            console.error("Error fetching car details:", error)
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (bookings.length === 0) {
    return <h1 className="container">No bookings found</h1>;
  } else {
    return (
      <div className="container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Starting Date</th>
              <th>Ending Date</th>
              <th>Transmission</th>
              <th>Price</th>
              
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.car ? booking.car.model : "Unknown"}</td>
                <td>{booking.startingDate}</td>
                <td>{booking.endingDate}</td>
                <td>{booking.car ? booking.car.transmission : "Unknown"}</td>
                <td>{booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowBookings;
