/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Car.css"

const OwnCars = () => {
  const showCarsApi = process.env.REACT_APP_API_URL + "/cars";
  const [car, setCar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCars();
  }, []);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(showCarsApi.concat("/") + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setCar(car.filter((item) => item._id !== id));
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getCars = () => {
    axios
      .get(showCarsApi.concat("/") + "own",{
        headers:{
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCar(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!car.map) {
    return (
      <div className="container">
        <h1 className="container">No cars found</h1>
        <Link to={`/create-car`}>
          <i className="fas fa-car boton" aria-hidden="true">
            <span>Create new car</span>
          </i>
        </Link>{" "}
      </div>
    );
  } else {
    return (
      <div className="container">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}

            <Link to={`/create-car`}>
              <div className="boton">
              <i className="fas fa-car" aria-hidden="true">
                <span> Register new car</span>
              </i>
              </div>
            </Link>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Model</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Transmission</th>
              <th>Price per day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {car.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{item.serialNum}</td>
                  <td>{item.model}</td>
                  <td>{item.brand}</td>
                  <td>{item.year}</td>
                  <td>{item.transmission}</td>
                  <td>{item.pricePerDay}</td>
                  <td>
                    <i
                      className="fas fa-trash"
                      aria-hidden="true"
                      onClick={() => handelDelete(item._id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};
export default OwnCars;
