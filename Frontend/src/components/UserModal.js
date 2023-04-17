import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserModal({ viewUser }) {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                View User Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>First Name:{viewUser && viewUser.firstName}</p>
              <p>Last Name:{viewUser && viewUser.lastName}</p>
              <p>Email:{viewUser && viewUser.email}</p>
              <p>Date Of Birth:{viewUser && viewUser.dateOfBirth}</p>
              <p>mobile:{viewUser && viewUser.mobile}</p>
              <p>
                status:{viewUser && (viewUser.status ? "Active" : "Inactive")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
