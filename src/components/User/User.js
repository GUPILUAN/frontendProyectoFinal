/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import "./User.css";

const User = () => {
  const [user, setUser] = useState({});
  //const { id } = useParams();
  const getUserApi = process.env.REACT_APP_API_URL + "/users/";

  useEffect(() => {
    getUser();
  }, []);


  const getUser = () => {
    const token = sessionStorage.getItem("token");

    axios
      .get(getUserApi.concat("/data") , {
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

  return (
    <div className="user">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{user.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default User;
