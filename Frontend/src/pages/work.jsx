import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSearchParams} from "react-router-dom";


function Work() {

    const [tableData, setTableData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      async function fetchData() {
        const response = await axios.get(`http://localhost:8080/work/get-work-inclass/${searchParams.get('classid')}`);
       console.log(response.data); 
       setTableData(response.data); 
      }
      fetchData();
    }, [searchParams]); 
  
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
              <h1 className="text-2xl font-semibold text-blue-800">Welcome</h1>
            </div>

            <div className="text-center">
              <p>Register No: </p>
            </div>
          </div>

          {tableData.map((item, index) => (
            <div className="flex gap-4 mt-20 justify-center flex-wrap items-center">
              <a
                href="#"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-72"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.topic}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.docPath}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.createdDate}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.createdBy}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Work


  
  