import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/navbar.jsx";
import BookRoom from "./components/booking.jsx";
import ViewBookings from "./components/viewings.jsx";
import AdminDashboard from "./components/adminDashboard.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";

export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [showLogin, setShowLogin] = useState(true);

  if (!token) {
    return (
      <>
        {showLogin ? <Login /> : <Register />}

        <button
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </>
    );
  }


  if (role === "admin") {
    return <AdminDashboard />;
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<BookRoom />} />
        <Route path="/view-rooms" element={<ViewBookings />} />
      </Routes>
    </BrowserRouter>
  );
}