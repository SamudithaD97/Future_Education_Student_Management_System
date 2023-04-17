import axios from "axios";
import { useState } from "react";
import "../components/login.css";
import Forgotpassword from "./forgotpassword";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import st1 from "../images/st3.jpg";
import { BrowserRouter, Router, Link, useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:8080/student-login", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        console.log(res);
        navigate('/card');
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        alert("User Login Failed");
      });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 ">
      <div className="container bg-black">
        <div className="">
          <img src={st1} alt="sms" className="object-contain" />
        </div>
      </div>
      <div className="bg-white justify-center flex flex-col h-screen my-auto items-center bgimg bg-cover ">
        <div>
          <div className="mb-5 text-align: center font-bold underline text-5xl flex flex-col italic font-weight: 300]">
            FUTURE EDUCATION-STUDENT LOGIN
          </div>
        </div>
      
        <form
          className="register-form flex flex-col space-y-10 ... "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <div >
              <TextField
                name="username"
                placeholder="Email"
                type={'email'}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                variant="standard"
                color="warning"
                style={{ width: 400, backgroundColor: '#F2F2F2', borderRadius: 5, border: 'solid 1px #F2F2F2', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}
                focused
              />
            </div>
          </div>
          <div>
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              variant="standard"
                color="warning"
                style={{ width: 400, backgroundColor: '#F2F2F2', borderRadius: 5, border: 'solid 1px #F2F2F2', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}
                focused
              helperText="Password must be atleast 8 characters"
            />
          </div>

          <div>
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>

          <div>
            <Button variant="contained" size="large" type="submit">
              Login
            </Button>
          </div>
          <div>
            <Link to="/register">New user?</Link>
          </div>
        </form>
        </div>
    </div>
  );
}

export default Login;
