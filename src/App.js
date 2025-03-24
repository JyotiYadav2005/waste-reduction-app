import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import LogActivity from "./components/LogActivity";
import RecyclingCenters from "./pages/RecyclingCenters";
import SideBar from "./components/SideBar";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import SanitationWorkers from "./components/SanitationWorkers";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <SideBar />
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/log-activity"
            element={
              <PrivateRoute>
                <SideBar />
                <LogActivity />
              </PrivateRoute>
            }
          />
          <Route
            path="/recycling-centers"
            element={
              <PrivateRoute>
                <SideBar />
                <RecyclingCenters />
              </PrivateRoute>
            }
          />
          <Route path="/sanitation-workers" element={<SanitationWorkers />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
