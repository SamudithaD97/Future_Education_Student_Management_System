import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function NoteForm({
  email,
  setEmail,
  password,
  setPassword,
  fetchData,
}) {
  const inputHandler = (e) => {
    console.log(e.target.value);
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
    console.log(email, password);
  };

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  const addUsersHandler = (e) => {
    console.log("adding");
    axios
      .post(`http://localhost:8070/user/add`, {
        email: email,
        password: password,
      })
      .then((result) => {
        fetchData();

        console.log("notes");
      })
      .catch((err) => {
        console.log(err);
      });
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form
              onSubmit={handleSubmit(addUsersHandler)}
              style={{
                border: "2px solid #212529",
                borderRadius: "10px",
                padding: "30px",
              }}
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => inputHandler(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => inputHandler(e)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Users
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
