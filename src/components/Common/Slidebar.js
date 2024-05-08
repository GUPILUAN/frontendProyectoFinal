import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./Common.css";

class SlideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: null,
      showSubmenu: false,
      showUserOptions: sessionStorage.getItem("token") ? true : false,
      user: null,
    };
    this.userIn();
  }

  handleClick(index) {
    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex === index ? null : index,
    }));
  }

  handleSubMenuClick = () => {
    this.setState((prevState) => ({
      showSubmenu: !prevState.showSubmenu,
    }));
  };

  handleResetSubMenu = () => {
    this.setState(() => ({
      showSubmenu: false,
    }));
  };

  handleLogOut = () => {
    sessionStorage.removeItem("token");
    this.setState({
      showUserOptions: sessionStorage.getItem("token") ? true : false,
      user:null
    });
    
  };

  userIn() {
    const getUserApi = process.env.REACT_APP_API_URL + "/users/data";
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get(getUserApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.setState({
            user: res.data,
          });
        })
        .catch((err) => {
          this.setState({
            user: null,
          });
          console.log(err);
        });
    }
  }

  render() {
    const urlImg =
      "https://th.bing.com/th/id/OIP.j_eWpTRqrOOdRgcSmcQv0gHaHp?w=202&h=209&c=7&r=0&o=5&dpr=2&pid=1.7";
    const { user } = this.state;
    return (
      <div className="sidebar">
        <div className="head">
          <div className="user-img">
            <img
              src={user && user.image ? user.image : urlImg}
              alt="New York"
              className="d-block"
            />
          </div>
          <div className="user-details">
            <p className="title">
              {user && user.isOwner ? "Propietario" : "Usuario"}
            </p>
            <p className="name">{user ? user.name : "Inicia Sesion"}</p>
          </div>
        </div>

        <div className="nav">
          <div className="menu">
            <p className="title">Menu</p>

            <ul>
              <li
                className={this.state.activeIndex === 0 ? "active" : ""}
                onClick={() => {
                  this.handleClick(0);
                  this.handleResetSubMenu();
                }}
              >
                <Link className="text" to="/">
                  <i className="icon fas fa-home"></i> Home
                </Link>
              </li>
              {!this.state.showUserOptions && (
                <li
                  className={this.state.activeIndex === 1 ? "active" : ""}
                  onClick={() => {
                    this.handleClick(1);
                    this.handleResetSubMenu();
                  }}
                >
                  <Link className="text" to="create-user">
                    <i className="icon fas fa-user-plus"></i> Sign up
                  </Link>
                </li>
              )}
              {!this.state.showUserOptions && (
                <li
                  className={this.state.activeIndex === 2 ? "active" : ""}
                  onClick={() => {
                    this.handleClick(2);
                    this.handleResetSubMenu();
                  }}
                >
                  <Link className="text" to="/login">
                    <i className="icon fas fa-sign-in-alt"></i> Log in
                  </Link>
                </li>
              )}
              {this.state.showUserOptions && (
                <li
                  style={{ cursor: "pointer" }}
                  className={this.state.activeIndex === 3 ? "active" : ""}
                  onClick={() => this.handleClick(3)}
                >
                  <a
                    className="text"
                    href
                    onClick={() => this.handleSubMenuClick()}
                  >
                    <i className="icon fas fa-user"></i>
                    <span className="text">User</span>
                    <i className="arrow fa-solid fa-caret-down"></i>
                  </a>
                  <CSSTransition
                    in={this.state.showSubmenu}
                    timeout={300}
                    classNames="submenu"
                    unmountOnExit
                  >
                    <ul className="sub-menu">
                      <li>
                        <Link
                          className="text"
                          onClick={() => this.handleSubMenuClick()}
                          to="show-user"
                        >
                          My profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text"
                          onClick={() => this.handleSubMenuClick()}
                          to="cars"
                        >
                          Make a booking
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text"
                          onClick={() => this.handleSubMenuClick()}
                          to="my-bookings"
                        >
                          My bookings
                        </Link>
                      </li>
                    </ul>
                  </CSSTransition>
                </li>
              )}
              {this.state.showUserOptions && (
                <CSSTransition
                  in={this.state.showSubmenu}
                  timeout={300}
                  classNames="menux"
                >
                  <li
                    onClick={() => {
                      this.handleLogOut();
                      this.userIn();
                    }}
                  >
                    <Link className="text" to="/">
                      <i className="icon fas fa-door-open  "></i> LogOut
                    </Link>
                  </li>
                </CSSTransition>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SlideBar;
