/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Car.css";

const Car = () => {
  const [car, setCar] = useState({});
  const { id } = useParams();
  const getCarApi = process.env.REACT_APP_API_URL + `/cars/car/${id}`;

  useEffect(() => {
    getCar();
  }, []);

  const getCar = () => {
    axios
      .get(getCarApi)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className=" car">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Serial Number</th>
              <th>Transmission</th>
              <th>Capacity</th>
              <th>Price Per Day</th>
              <th>Location</th>
              <th>Insurance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{car.model}</td>
              <td>{car.brand}</td>
              <td>{car.year}</td>
              <td>{car.serialNum}</td>
              <td>{car.transmission}</td>
              <td>{car.capacity}</td>
              <td>{car.pricePerDay}</td>
              <td>{car.location}</td>
              <td>{car.insurance}</td>
            </tr>
          </tbody>
        </table>
        <div className="images">
          <div className="mt-4 car-image">
            <img src={car.image} alt="car" />
          </div>
        </div>

        <div className="book">
          <Link to={`/bookings/${id}`} className="btn btn-custom">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Car;
