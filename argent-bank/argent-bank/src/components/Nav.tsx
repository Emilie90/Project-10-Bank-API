import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../img/argentBankLogo.png";
import { RootState } from "../store"; // Typage pour accéder au store
import { isSignIn, logout } from "../reducers/reducers"; // Ajout de fetchUserProfile
import "../css/main.css";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.profile);
  const firstName = user.firstName;
  const navigate = useNavigate();
  // Récupération des informations de l'utilisateur
  const isSignedIn = useSelector((state: RootState) => state.signIn.signIn);
  // const firstName = useSelector((state: RootState) => state.signIn.firstName);

  // Fonction de déconnexion
  const handleSignOut = () => {
    sessionStorage.clear(); // Clear the token

    dispatch(isSignIn(false));
    dispatch(logout());

    navigate("/sign-in"); // Déclenche la déconnexion
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="./index">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {isSignedIn ? (
          // Si l'utilisateur est connecté, on affiche son pseudo et le bouton Sign Out
          <div className="main-nav-item">
            <i className="fa fa-user-circle"></i> {firstName}
            <span onClick={handleSignOut} className="main-nav-item sign-out">
              <i className="fa fa-sign-out"></i> Sign Out
            </span>
          </div>
        ) : (
          // Sinon, afficher le lien Sign In
          <a className="main-nav-item" href="./sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default Nav;
