import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/admin/login",
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        toast.success(result.data.message);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <img
            className="mb-1"
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Logo"
            width={72}
            height={72}
          />
          <h1 className="h3 mb-3 fw-normal">Login</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mt-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-3 my-3" type="submit">
            Login
          </button>
          <p className="mt-2 mb-3 text-body-secondary">
            Don't have an account? <Link to="/admin/register">Click here</Link>{" "}
            to register
          </p>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Login;
