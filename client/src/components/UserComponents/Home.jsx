import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [user, setUser] = useState("");

  function handleSignout() {
    axios
      .get("http://localhost:3000/admin/signout", { withCredentials: true })
      .then((result) => {
        toast.success(result.data.message);
        navigate("/admin/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
          ></a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/shop" className="nav-link px-2 link-secondary">
                Shop
              </Link>
            </li>

            <li>
              <Link to="/cart" className="nav-link px-2 link-body-emphasis">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="nav-link px-2 link-body-emphasis">
                My Orders
              </Link>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="dropdown text-end">
            <a
              href="#"
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              
            </a>
            <ul className="dropdown-menu text-small">
              <li>
                <a className="dropdown-item" href="#">
                  {user}
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleSignout}>
                  Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer />

      <Outlet />
    </div>
  );
}

export default Home;
