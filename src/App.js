import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Home from "./Pages/Home";
import Header from "./Pages/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Auth/Register";
import Admin from "./Pages/Admin";
import Tenant from "./Pages/Tenant";
import ViewUser from "./Pages/View/ViewUser";
import AddUser from "./Pages/Add/AddUser";
import EditUser from "./Pages/Edit/EditUser";
import AddBuilding from "./Pages/Add/AddBuilding";
import ViewBuilding from "./Pages/View/ViewBuilding";
import EditBuilding from "./Pages/Edit/EditBuilding";
import ViewRoom from "./Pages/View/ViewRoom";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword ";
import SendMail from "./Auth/SendMail";
import AddRoom from "./Pages/Add/AddRoom";
import EditRoom from "./Pages/Edit/EditRoom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/sendMail" element={<SendMail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/viewUser/:id" element={<ViewUser />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/addBuilding" element={<AddBuilding />} />
        <Route path="/viewBuilding/:id" element={<ViewBuilding />} />
        <Route path="/editBuilding/:id" element={<EditBuilding />} />
        <Route path="/viewRoom/:id" element={<ViewRoom />} />
        <Route path="/addRoom" element={<AddRoom />} />
        <Route path="/editRoom/:id" element={<EditRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
