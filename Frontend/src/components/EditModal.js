import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditModal({ edit, fetchData }) {
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  useEffect(() => {
    setTitle(edit.title);
    setDesc(edit.description);
  }, [edit]);

  const updateNote = (event) => {
    console.log("adding");
    axios
      .put(`http://localhost:8070/note/update/${edit.id}`, {
        title: Title,
        description: Desc,
      })
      .then((result) => {
        fetchData();
        console.log("notes");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edittitle"
                    placeholder="Enter Your Title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="edisdesc"
                    rows="3"
                    className="form-control"
                    placeholder="Enter Your Description"
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={updateNote}
              >
                Edit Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
