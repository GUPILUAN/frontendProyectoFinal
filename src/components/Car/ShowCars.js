/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";

const ShowCars = () => {
  const showCarsApi = process.env.REACT_APP_API_URL + "/cars";
  const [car, setCar] = useState([]);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    axios
      .get(showCarsApi)
      .then((res) => {
        console.log(res.data);
        setCar(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    if (!car.map) {
      return <h1 className="container">No cars found</h1>;
    } else {
      return (
        <div className="container">
          <table className="custom-table">
            <thead>
              <tr>
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
                    <td>{item.model}</td>
                    <td>{item.brand}</td>
                    <td>{item.year}</td>
                    <td>{item.transmission}</td>
                    <td>{item.pricePerDay}</td>
                    <td>
                      <Link to={`/car/${item._id}`}>
                        <i className="fas fa-eye" aria-hidden="true"></i>
                      </Link>                      
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
export default ShowCars;
