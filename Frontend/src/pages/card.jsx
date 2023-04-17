import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./Sections/Navigation";
import FormDialog from "./Sections/AddClassModal";

function Card() {
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();
  const [resID, setResID] = useState(null);
  useEffect(() => {
    if ("user" in localStorage) {
      setResID(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [resID]);

  async function fetchData() {
    if (resID && resID.studentId) {
      const response = await axios.get(
        `http://localhost:8080/student/get-by-student-id/${resID.studentId}`
      );
      setTableData(response.data);
    } else if (resID && resID.teacherId) {
      const response = await axios.get(
        `http://localhost:8080/teacher/get-by-teacher-id/${resID.teacherId}`
      );
      setTableData(response.data);
    }
  }

  return (
    <div>
      <Navigation />

      <div className="px-24">
        {resID && (
          <div className="grid gp-10 bg-blue-200 rounded-[10px] p-10 mt-10">
            <div className="flex justify-center text-center ">
              <h1 className="text-2xl font-bold">
                {resID.studentId ? <>Student</> : <>Teacher</>} Classes
              </h1>
            </div>
            <div className="flex justify-center text-center mt-4">
              <h1 className="text-2xl font-semibold text-blue-800">
                Welcome, {resID?.fullName}!
              </h1>
            </div>

            <div className="text-center">
              <p>
                {resID.studentId ? (
                  <>Register No: {resID?.regNo}</>
                ) : (
                  <>Designation: {resID?.designation}</>
                )}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-20 justify-center flex-wrap items-center">
          {tableData.map((item, index) => (
            <div className="flex justify-center group group/item w-[260px] py-10">
              <a
                key={index}
                onClick={() => navigate(`/work?classid=${item.classId}`)}
                style={{ width: "100%" }}
                className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {item.subject}
                  </h5>
                  <p className="font-normal text-gray-700">
                    Credits: {item.noOfCredits}
                  </p>
                </div>
              </a>
            </div>
          ))}
          {resID && resID?.teacherId ? (
            <FormDialog fetchData={fetchData} teacherId={resID?.teacherId}/>
          ) : (
            <FormDialog fetchData={fetchData} studentId={resID?.studentId}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
