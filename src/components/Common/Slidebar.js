/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./Common.css";

class SlideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideBar: false,
      activeIndex: null,
      showSubmenu: false,
      showUserOptions: sessionStorage.getItem("token") ? true : false,
      user: null,
    };
    this.userIn();
  }

  handleClick = (index) => {
    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex === index ? null : index,
    }));
  };

  handleSidebarClick = () => {
    this.setState((prevState) => ({
      showSideBar: !prevState.showSideBar,
    }));
  };

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
      user: null,
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
      <div>
        <div className={!this.state.showSideBar ? "active sidebar" : "sidebar"}>
          <div className="menu-btn">
            <i
              className="icon fas fa-arrow-left"
              onClick={() => {
                this.handleResetSubMenu();
                this.handleSidebarClick();
                this.setState({ activeIndex: null });
              }}
            ></i>
          </div>
          <div className="head">
            <div className="user-img">
              <img
                src={user && user.image ? user.image : urlImg}
                alt="NoImage"
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
                  <Link to="/">
                    <i className="icon fas fa-home"></i>
                    <span className="text">Home</span>
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
                    <Link to="create-user">
                      <i className="icon fas fa-user-plus"></i>
                      <span className="text">Sign up</span>
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
                    <Link to="/login">
                      <i className="icon fas fa-sign-in-alt"></i>
                      <span className="text">Login</span>
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
                      href="#"
                      onClick={() => {
                        if (this.state.showSideBar) {
                          this.handleSubMenuClick();
                        } else {
                          this.handleSidebarClick();
                          this.handleSubMenuClick();
                        }
                      }}
                    >
                      <i className="icon fas fa-user"></i>
                      <span className="text">User</span>
                      <i
                        className={
                          this.state.showSideBar
                            ? "arrow giro fa-solid fa-caret-down"
                            : "arrow  fa-solid fa-caret-down"
                        }
                      ></i>
                    </a>

                    <CSSTransition
                      in={this.state.showSubmenu && this.state.showSideBar}
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
                    in={this.state.showSubmenu && this.state.showSideBar}
                    timeout={300}
                    classNames="menux"
                  >
                    <li
                      onClick={() => {
                        this.handleLogOut();
                        this.userIn();
                      }}
                    >
                      <Link to="/">
                        <i className="icon fas fa-door-open"></i>
                        <span className="text">LogOut</span>
                      </Link>
                    </li>
                  </CSSTransition>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SlideBar;
