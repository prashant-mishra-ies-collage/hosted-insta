import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

export default function Signin() {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }

    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("sign is uccessfully");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }
      });
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        .signin-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f5f5;
          padding: 20px;
        }

        .signin-wrapper {
          width: 100%;
          max-width: 400px;
        }

        .login-form {
          background: white;
          padding: 30px 25px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .login-form h1 {
          text-align: center;
          margin-bottom: 10px;
        }

        .login-form input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          width: 100%;
        }

        #login-btn {
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        #login-btn:hover {
          background: #0056b3;
        }

        .loginform2 {
          text-align: center;
          margin-top: 15px;
          font-size: 14px;
        }

        .loginform2 span {
          color: #007bff;
          cursor: pointer;
          margin-left: 5px;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .login-form {
            padding: 20px;
          }

          .login-form h1 {
            font-size: 22px;
          }

          .login-form input {
            font-size: 13px;
            padding: 8px;
          }
        }
      `}</style>

      <div className="signin-container">
        <div className="signin-wrapper">
          <div className="login-form">
            <h1>TrueZone</h1>

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="submit"
              id="login-btn"
              value="Sign In"
              onClick={postData}
            />
          </div>

          <div className="loginform2">
            Dont have an account ?
            <NavLink to="/signup">
              <span>Sign up</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
