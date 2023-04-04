import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const menuLinks = [
    {
      text: "My Jobs",
      href: "/myjobs",
    },
    {
      text: "All Jobs",
      href: "/repairs",
    },
  ];

  return (
    <>
      <div className="navbar bg-base-100 pe-6">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user ? (
                menuLinks.map((link) => (
                  <li key={link.text + "_dropdown"}>
                    <Link to={link.href}>{link.text}</Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link to="/">Home</Link>
                </li>
              )}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl" href="/">
            eManager
          </a>
        </div>
        {user && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {menuLinks.map((link) => (
                <li key={link.text + "_centrebtn"} className="mx-2">
                  <Link to={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {user ? (
          <div className="navbar-end">
            <div className="hidden md:flex justify-content-center align-items-center me-3">
              Welcome, {user.email}!
            </div>
            <Link className="btn btn-sm" to="/" onClick={() => handleLogout()}>
              Log out
            </Link>
          </div>
        ) : (
          <div className="navbar-end">
            <Link className="btn btn-primary btn-sm me-3" to="/signup">
              Sign up
            </Link>
            <Link className="btn btn-primary btn-sm me-3" to="/login">
              Log in
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
