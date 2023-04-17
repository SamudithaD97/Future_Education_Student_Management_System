import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const RegisterUser = (event) => {
    let data = user;
    data.status = true;
    console.log("adding");
    axios
      .put(
        `http://localhost:8070/user/update/${localStorage.getItem("userId")}`,
        data
      )
      .then((result) => {
        navigate("/Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputName1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName1"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName2" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName2"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputdate" className="form-label">
                Date Of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleInputdate"
                onChange={(e) =>
                  setUser({ ...user, dateOfBirth: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputmb" className="form-label">
                Mobile
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputmb"
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
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
          <button className="btn btn-primary" onClick={() => RegisterUser()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
