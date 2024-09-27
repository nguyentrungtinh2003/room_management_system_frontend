import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Home from "./Pages/Home";
import Header from "./Pages/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Auth/Register";
import Admin from "./Pages/Admin";
import Tenant from "./Pages/Tenant";

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
      </Routes>
    </Router>
  );
}

export default App;
