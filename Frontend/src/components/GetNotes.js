import React from "react";
import axios from "axios";

export default function GetNotes({ note, setedit, fetchData }) {
  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:8070/note/delete/${id}`)
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
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{note && note.title}</h5>
          <p className="card-text">{note && note.description}</p>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              setedit({
                id: note._id,
                title: note.title,
                description: note.description,
              })
            }
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteNote(note._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}
