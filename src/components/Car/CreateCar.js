import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Car.css";

const CreateCar = () => {
  const navigate = useNavigate();
  const createCarApi = process.env.REACT_APP_API_URL + "/cars";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState({
    model: "",
    brand: "",
    year: "",
    serialNum: "",
    transmission: "",
    capacity: "",
    pricePerDay: "",
    location: "",
    insurance: "",
  });

  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCar({ ...car, [name]: value });
  };

  const handelSubmit = async (event) => {
    const token = sessionStorage.getItem("token");

    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(createCarApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(car),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully!", data);
        setCar({
          model: "",
          brand: "",
          year: "",
          serialNum: "",
          transmission: "",
          capacity: "",
          pricePerDay: "",
          location: "",
          insurance: "",
        });
        navigate("/ownCars");
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
    <div className="car-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Register Car</p>
      </div>
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="model" className="form-label">
              Model
            </label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              value={car.model}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={car.brand}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="number"
              className="form-control"
              id="year"
              name="year"
              value={car.year}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="serialNum" className="form-label">
              Serial Number
            </label>
            <input
              type="text"
              className="form-control"
              id="serialNum"
              name="serialNum"
              value={car.serialNum}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="transmission" className="form-label">
              Transmission
            </label>
            <input
              type="text"
              className="form-control"
              id="transmission"
              name="transmission"
              value={car.transmission}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              value={car.capacity}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pricePerDay" className="form-label">
              Price Per Day
            </label>
            <input
              type="number"
              className="form-control"
              id="pricePerDay"
              name="pricePerDay"
              value={car.pricePerDay}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={car.location}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="insurance" className="form-label">
              Insurance
            </label>
            <input
              type="text"
              className="form-control"
              id="insurance"
              name="insurance"
              value={car.insurance}
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

export default CreateCar;
