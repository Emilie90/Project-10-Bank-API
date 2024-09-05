import React from "react";
import { Link } from "react-router-dom"; // Remplacez les liens HTML statiques
import logo from "../img/argentBankLogo.png";
import "../css/main.css";

const Nav: React.FC = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/index">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/sign-in">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
