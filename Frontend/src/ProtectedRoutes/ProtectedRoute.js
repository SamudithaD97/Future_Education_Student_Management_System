import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('loading');
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(children.type.name);
    setTimeout(function () {
      if ('user' in localStorage){
        setUser(JSON.parse(localStorage.getItem("user")));
        setCurrentUser('user')
      }else {
        setCurrentUser('login')
      }
    }, 1000);
  }, []);

  return (
    currentUser === 'loading' ? <Spinner />
      : currentUser === 'login' ? <Navigate to="/login" />
        : children
  )
};

export default ProtectedRoute