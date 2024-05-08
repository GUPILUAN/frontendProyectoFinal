import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
const Login = () => {
  
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const loginUserApi = process.env.REACT_APP_API_URL + "/users/login";
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(loginUserApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully!", data);
        sessionStorage.setItem('token', data.token);
        const token = sessionStorage.getItem('token');   
        console.log(token);
        navigate("/show-user")
        window.location.reload();
      }else{
        const data = await response.json();
        console.error("Form submission failed!");
        setError(data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError("Error al iniciar sesión");
    } finally{
      setIsLoading(false);
    }
  };

  return (
   <div className="user-form">
      <form onSubmit={handleSubmit}>
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Iniciar sesión</p>
      </div>
        <div className="mb-3 mt-3 ">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
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
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary submit-btn">
          Iniciar Sesión
        </button>
      </form>

      </div>

  );
};

export default Login;
