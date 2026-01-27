import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashBoard from "./pages/UserDashBoard";
import DoctorLogin from "./pages/DoctorLogin";
import AddDoctor from "./pages/AddDoctor";
import CreateAppointment from "./components/CreateAppointment";
import UserAppointments from "./pages/UserAppointments";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Services from "./pages/Services";
import About from "./pages/About";

export default function App() {
  return (

///

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



//


}
