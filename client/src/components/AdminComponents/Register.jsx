import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [isInputEnabled, setInputEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/admin/register", { email, password, otp })
      .then((result) => {
        toast.success(result.data.message);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/admin/login");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOtp() {
    axios
      .post("http://localhost:3000/admin/sendotp", { email })
      .then((result) => {
        console.log(result);
        toast.success(result.data.message);
        setInputEnabled(true);
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
          <h1 className="h3 mb-3 fw-normal">Add new manager</h1>

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

          <p className="mt-2 mb-3 text-body-secondary">
            <button
              type="button"
              onClick={handleOtp}
              className="btn btn-link p-0"
            >
              Click here
            </button>{" "}
            to send an approval code to your admin and enter the <br />
            approval code to complete registration.
          </p>

          <div className="form-floating mt-3">
            <input
              type="text" // Changed to text for OTP input
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              id="floatingotp2"
              placeholder="Approval Code"
              disabled={!isInputEnabled}
            />
            <label htmlFor="floatingotp2">Approval Code</label>
          </div>

          <button className="btn btn-primary w-100 py-3 my-3" type="submit">
            Register
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Register;
