import axios from "axios";
import { useState } from "react";
import "../components/registration.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import st1 from "../images/st3.jpg";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [regNo, setRegNo] = useState("");
  const navigate = useNavigate();

  const datePickerStyles = {
    width: 400,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    border: 'solid 1px #F2F2F2',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5
  };
  async function handleSubmit(event) {
    event.preventDefault();

    await axios
      .post("http://localhost:8080/student-register", {
        username: username,
        password: password,
        contactNo: contactNo,
        fullName: fullName,
        birthDate: birthDate,
        regNo: regNo
      })
      .then((res) => {
        alert("Student Registation Successfully");
        console.log(res);
        setUsername("");
        setPassword("");
        setContactNo("");
        setFullName("");
        setBirthDate("");
        setRegNo("");
        navigate('/login');
      })
      .catch((err) => {
        alert("Student Registation Failed");
      });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="container bg-black">
        <div className="">
          <img src={st1} alt="sms" className="object-contain" />
        </div>
      </div>
      <div className="bg-white justify-center flex flex-col h-screen my-auto items-center bgimg bg-cover ">
        <div>
          <div className="mb-5 text-align: center font-bold underline text-5xl flex flex-col italic font-weight: 300]">
            FUTURE EDUCATION-STUDENT REGISTRATION
          </div>
        </div>
        <form
          className="register-form flex flex-col space-y-5 ... "
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
              style={{ width: 400, backgroundColor: '#F2F2F2', borderRadius: 5, border: 'solid 1px #F2F2F2', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}
              variant="standard"
              color="warning"
              focused
              helperText="Password must be atleast 8 characters, Uppercase and A number"
            />
          </div>
          <div>
            <TextField
              name="contactNo"
              placeholder="Contact No"
              onChange={(event) => {
                setContactNo(event.target.value);
              }}
              variant="standard"
              style={{ width: 400, backgroundColor: '#F2F2F2', borderRadius: 5, border: 'solid 1px #F2F2F2', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}
              color="warning"

              focused
            />
          </div>

          <div>
            <TextField
              name="fullName"
              placeholder="Name"
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              variant="standard"
              color="warning"
              style={{ width: 400, backgroundColor: '#F2F2F2', borderRadius: 5, border: 'solid 1px #F2F2F2', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}
              focused
            />
          </div>
          <div>
            <TextField
              name="regNo"
              placeholder="Registration No"
              onChange={(event) => {
                setRegNo(event.target.value);
              }}
              variant="standard"
              color="warning"
              style={{ width: 400, backgroundColor: '#F2F2F2', borderRadius: 5, border: 'solid 1px #F2F2F2', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}
              focused
            />
          </div>
          <div>
            <label for="date">Select a Birth Day:</label>
            <input type='date'
              onChange={(event) => {
                setBirthDate(event.target.value);
              }}
              variant="standard"
              color="warning"
              focused
              name="birthDate"
              className="date-picker"
              placeholder="Enter your birth date (DD/MM/YYYY)"
            />

          </div>

          <div>
            <Button variant="contained" size="large" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
