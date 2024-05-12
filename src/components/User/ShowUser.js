/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowUser = () => {
  const showUserApi = process.env.REACT_APP_API_URL + "/users";

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(showUserApi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUser(user.filter((item) => item._id !== id));
      sessionStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  /*
  const getUsers = () => {
    axios
      .get(showUserApi)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

  const getUser = () => {
    const token = sessionStorage.getItem("token");

    axios
      .get(showUserApi.concat("/data"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser([res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const urlImg =
    "https://th.bing.com/th/id/OIP.j_eWpTRqrOOdRgcSmcQv0gHaHp?w=202&h=209&c=7&r=0&o=5&dpr=2&pid=1.7";

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="container">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}

        {user.map((item) => {
          return (
            <div className="user">
              <h1>
                User: {item.name}{" "}
                <span>
                  <img
                    src={item.image ? item.image : urlImg}
                    alt="New York"
                    className="user-image"
                  />
                </span>
              </h1>

              <p>Email: {item.email}</p>
              <p>Address: {item.address}</p>

              <div className="user-actions">
                <Link to={`/edit-user/${item._id}`}>
                  <i className="fas fa-pencil" aria-hidden="true">
                    <span> Edit</span>
                  </i>
                </Link>

                {item.isOwner && (
                  <Link to={`/ownCars`}>
                    <i className="fas fa-car" aria-hidden="true">
                      <span> My cars</span>
                    </i>
                  </Link>
                )}

                <i
                  className="fas fa-trash"
                  aria-hidden="true"
                  onClick={() => handelDelete(item._id)}
                >
                  <span> Erase account</span>
                </i>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default ShowUser;
