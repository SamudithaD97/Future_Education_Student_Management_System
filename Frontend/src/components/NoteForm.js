import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function NoteForm({
  title,
  settitle,
  description,
  setdescription,
  notes,
  setNotes,
  fetchData,
}) {
  const inputHandler = (e) => {
    console.log(e.target.value);
    if (e.target.id === "title") {
      settitle(e.target.value);
    } else {
      setdescription(e.target.value);
    }
    console.log(title, setdescription);
  };

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  const addNotesHandler = (e) => {
    console.log("adding");
    axios
      .post(`http://localhost:8080/note/add`, {
        title: title,
        description: setdescription,
        ownerId: JSON.parse(localStorage.getItem("userData")).id,
      })
      .then((result) => {
        fetchData();

        console.log("notes");
      })
      .catch((err) => {
        console.log(err);
      });
    settitle("");
    setdescription("");
  };
  return (
    <>
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form
              onSubmit={handleSubmit(addNotesHandler)}
              style={{
                border: "2px solid #212529",
                borderRadius: "10px",
                padding: "30px",
              }}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter Your Title"
                  value={title}
                  onChange={(e) => inputHandler(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  className="form-control"
                  placeholder="Enter Your Description"
                  value={setdescription}
                  onChange={(e) => inputHandler(e)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Add Notes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
