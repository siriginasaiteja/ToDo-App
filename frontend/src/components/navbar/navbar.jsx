import React from "react";
import { LuListTodo } from "react-icons/lu";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'
import {toast } from 'react-toastify';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const history = useNavigate();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    history("/");
    window.location.reload(true);

  };

   const delAcc = async () => {
    const id = sessionStorage.getItem("id");

    // It's good practice to confirm a destructive action
    if (!window.confirm("Are you sure you want to permanently delete your account?")) {
        return;
    }

    try {
        await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/api/v1/deleteAcc/${id}`);

        // 1. Show the success message.
        toast.success("Account Deleted Successfully");

        // 2. Clear local data and update the application state.
        sessionStorage.clear("id");
        dispatch(authActions.logout());

        // 3. Navigate. React will handle the re-render. NO page reload needed.
        history("/");

    } catch (error) {
        console.error("Account deletion failed:", error); // It's good to log the error
        const message = error.response?.data?.message || "Account Deletion Failed";
        toast.error(message);
    }
};

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>
              <LuListTodo />
              &nbsp;TODO
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active btn-nav"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link
                  className="nav-link active btn-nav"
                  aria-current="page"
                  to="/aboutus"
                >
                  About Us
                </Link>
              </li>

              {!isLoggedIn && (
                <>
                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/signin"
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/todo"
                    >
                      Todo
                    </Link>
                  </li>
                  <li>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn  dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FaUserCircle className="dropdown-icon"/>
                      </button>
                      <ul className="dropdown-menu">
                          <li className="btn-logout nav-item mx-1" onClick={logout}>
                            <Link
                              className="nav-link active btn-nav"
                              aria-current="page"
                              to="#"
                            >
                              Log Out
                            </Link>
                          </li>
                          <li className="btn-delete nav-item mx-1" onClick={delAcc}>
                            <Link
                              className=" nav-link active btn-nav"
                              aria-current="page"
                              to="#"
                            >
                              Delete Account
                            </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};
export default Navbar;
