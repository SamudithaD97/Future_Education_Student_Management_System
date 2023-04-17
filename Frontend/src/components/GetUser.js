import React from "react";
import axios from "axios";

export default function GetUser({ user, setviewUser }) {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{user && user.email}</h5>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          onClick={() => setviewUser(user)}
        >
          View
        </button>
      </div>
    </>
  );
}
