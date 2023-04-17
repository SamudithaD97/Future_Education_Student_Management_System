import TeachersRegister from "./pages/teachersRegistration";
import Register from "./pages/registration";
import Login from "./pages/login";
import TeachersLogin from "./pages/teachersLogin";
import HomePage from "./pages/homePage";
import Card from "./pages/card";
import Work from "./pages/work";
import Note from "./pages/note";

import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";

import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { render } from "react-dom";
import Forgotpassword from "./pages/forgotpassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teachersRegister" element={<TeachersRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teachersLogin" element={<TeachersLogin />} />
          <Route path="/note" element={<Note />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route
            path="/card"
            element={
              <ProtectedRoute>
                <Card />
              </ProtectedRoute>
            }
          />
          <Route
            path="/work"
            element={
              <ProtectedRoute>
                <Work />
              </ProtectedRoute>
            }
          />
          <Route
            path="/note"
            element={
              <ProtectedRoute>
                <Note />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
