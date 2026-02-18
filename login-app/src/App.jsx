import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import AdminPanel from "./components/AdminPanel";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={
            !user ? (
              <Login onLoginSuccess={setUser} />
            ) : user.role === "faculty" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/student" />
            )
          }
        />

        {/* Protected */}
        <Route
          path="/student"
          element={
            user ? (
              <StudentDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user ? (
              <AdminPanel user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;