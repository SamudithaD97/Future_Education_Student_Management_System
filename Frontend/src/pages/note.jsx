import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSearchParams} from "react-router-dom";


function Note() {
  const [tableData, setTableData] = useState([]);
  const [resID, setResID] = useState(null);
  useEffect(() => {
    if ("user" in localStorage) {
      setResID(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (resID && resID.studentId) {
        const response = await axios.get(
          `http://localhost:8080/note/display?Id=${resID.studentId}&isStudent=${true}`
          
        );
        setTableData(response.data);
      } else if (resID && resID.teacherId) {
        const response = await axios.get(
          `http://localhost:8080/note/display?Id=${resID.teacherId}&isStudent=${false}`
        );
        setTableData(response.data);
      }
    }
    fetchData();
  }, [resID]);
  
    return (
      // tableData.map((item, index) => (
      //   <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      //     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.topic}</h5>
      //     <p className="font-normal text-gray-700 dark:text-gray-400">{item.docPath}</p>
      //     <p className="font-normal text-gray-700 dark:text-gray-400">{item.createdDate}</p>
      //   </a>
      <div>
        <div className="px-24">
          <div className="grid gp-10 bg-blue-200 rounded-[10px] p-10 mt-10">
            <div className="flex justify-center text-center "></div>
            <div className="flex justify-center text-center mt-4">
              <h1 className="text-2xl font-semibold text-blue-800">Welcome to Note management system</h1>
            </div>

            <div className="text-center">
              <p>Register No:s17512 </p>
            </div>
          </div>

          {tableData.map((item, index) => (
            <div className="flex gap-4 mt-20 justify-center flex-wrap items-center">
              <a
                href="#"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-72"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.noteCreatedDate}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Note;


  
  