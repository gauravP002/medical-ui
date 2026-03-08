import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
//import LoadingSpinner from "./LoadingSpinner"; // add or adjust path if different

// ...existing code...
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const UserDashBoard = lazy(() => import("./pages/UserDashBoard"));
const DoctorLogin = lazy(() => import("./pages/DoctorLogin"));
const AddDoctor = lazy(() => import("./pages/AddDoctor"));
const CreateAppointment = lazy(() => import("./components/CreateAppointment"));
const UserAppointments = lazy(() => import("./pages/UserAppointments"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
// ...existing code...
export default function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
        
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<UserDashBoard />} />
              <Route path="/doctor-login" element={<DoctorLogin />} />
              <Route path="/addDoctor" element={<AddDoctor />} />
              <Route path="/addPaitent" element={<CreateAppointment />} />
              <Route path="/appoinments" element={<UserAppointments />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
            </Routes>
       
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};