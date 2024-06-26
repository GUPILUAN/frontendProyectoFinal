/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Common/Loader";
import ImageUploader from "../Common/ImageUploader";
import "./User.css";
const EditUser = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setImageDataURL] = useState(null);
  const getUserApi = process.env.REACT_APP_API_URL + "/users";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const token = sessionStorage.getItem("token");
    axios
      .get(getUserApi.concat("/data"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheckboxChange = () => {
    setUser({ ...user, isOwner: !user.isOwner });
  };

  const handleImageUpload = (dataURL) => {
    if (dataURL) {
      setImageDataURL(dataURL);
      setUser({ ...user, image: dataURL });
    } else {
      setError("Imagen muy pesada");
    }
  };

  const handleImageDelete = () => {
    setImageDataURL(null);
    setUser({ ...user, image: null });
  };
  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    fetch(getUserApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(true);
        window.location.href = "/";
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="user-form">
        <div className="heading">
          {isLoading && <Loader />}
          {error && <p>Error: {error}</p>}
          <p>Edit Form</p>
        </div>
        <form onSubmit={handelSubmit}>
          <div className="">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handelInput}
              placeholder="Vacío si no quieres cambiarla"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={user.address}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3">
            <h1 className="form-label">Profile Image (Max 5MB)</h1>
            {!user.image && <ImageUploader onImageUpload={handleImageUpload} />}
            {user.image && (
              <div className="uploaded-image">
                <img src={user.image} alt="Imagen Cargada" />
                <button className="btn" onClick={handleImageDelete}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            )}
          </div>
          <div className="mb-3 form-check ">
            <label htmlFor="isOwner" className="form-label">
              You own a car?
            </label>
            <input
              type="checkbox"
              id="isOwner"
              name="isOwner"
              className="form-check-input"
              checked={user.isOwner}
              onChange={handleCheckboxChange}
            />
          </div>
          <button type="submit" className="btn btn-primary submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditUser;
