import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import ImageUploader from "../Common/ImageUploader";
import "./User.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const createUserApi = process.env.REACT_APP_API_URL + "/users/register";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageDataURL, setImageDataURL] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    isOwner: false,
    image: "",
  });

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

  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleCheckboxChange = () => {
    setUser({ ...user, isOwner: !user.isOwner });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(createUserApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully!", data);
        setUser({
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          isOwner: false,
          image: "",
        });
        navigate("/login");
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
    <div className="container">
      <div className="user-form">
        <div className="heading">
          {isLoading && <Loader />}
          {error && <p>Error: {error}</p>}
          <p>Register</p>
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
              value={user.nombre}
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
              onChange={handelInput}
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
              value={user.password}
              onChange={handelInput}
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
            {!imageDataURL && (
              <ImageUploader onImageUpload={handleImageUpload} />
            )}
            {imageDataURL && (
              <div className="uploaded-image">
                <img src={imageDataURL} alt="Imagen Cargada" />
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

export default CreateUser;
