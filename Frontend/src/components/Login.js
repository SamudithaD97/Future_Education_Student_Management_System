import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import logo from "./logoPng.png";
import welcomeimg from "./welcomeback.svg";
const Login = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const LoginUser = (event) => {
    console.log("adding");
    axios
      .post(`http://localhost:8070/user/login`, user)
      .then((result) => {
        if (result.data.profile.accountType === "admin") {
          localStorage.setItem("userData", JSON.stringify(result.data.profile));
          navigate("/Admin");
        } else if (result.data.profile.status) {
          localStorage.setItem("userData", JSON.stringify(result.data.profile));
          navigate("/");
        } else {
          localStorage.setItem("userId", result.data.profile.id);
          navigate("/Register");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main-login">
      <div className="login-contain">
        <div className="left-side">
          <div className="img-class">
            <img src={logo} id="img-id" alt="" />
          </div>

          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </form>
          <button className="btn btn-primary" onClick={() => LoginUser()}>
            Submit
          </button>
          <div className="right-side">
            <div className="welcomeNote">
              <h3>Welcome Back!</h3>
            </div>
            <div className="welcomeImg">
              <img src={welcomeimg} id="wel-img-id" alt=""  width="150" height="100"/>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Login;
