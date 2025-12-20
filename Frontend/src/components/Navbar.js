import React from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const handleLogOutClick =() => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();
  return (
    <nav className="navbar bg-dark navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Paste It Cloud
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <Link className="btn mx-2" style={{display: localStorage.getItem('token')?"none":"block", color:"black", backgroundColor: "#EBD5AB"}} to="/login" role="button">Login</Link>
            <Link className="btn mx-2" style={{display: localStorage.getItem('token')?"none":"block", color:"black", backgroundColor: "#EBD5AB"}} to="/signup" role="button">Sign Up</Link>
            <button type="button" style={{display: localStorage.getItem('token')?"block":"none"}} onClick={handleLogOutClick} className="btn btn-danger">Log Out</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
