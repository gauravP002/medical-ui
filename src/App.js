import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashBoard from "./pages/UserDashBoard";
import DoctorLogin from "./pages/DoctorLogin";
import AddDoctor from "./pages/AddDoctor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<UserDashBoard />} />
         <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/addDoctor" element={<AddDoctor />} />

      </Routes>
    </BrowserRouter>
  );
}
