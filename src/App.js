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
import ViewUser from "./Pages/ViewUser";
import AddUser from "./Pages/AddUser";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/viewUser/:id" element={<ViewUser />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
