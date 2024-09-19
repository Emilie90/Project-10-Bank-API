import React from "react";
import Nav from "../components/Nav";
import User from "../components/User";
import Footer from "../components/Footer";
import "../css/main.css";
import { useSelector } from "react-redux";
import SignInPage from "./SignInPage";
import { RootState } from "../store";

const UserPage: React.FC = () => {
  const isSignedIn = useSelector((state: RootState) => state.signIn.signIn);
  return (
    <>
      {isSignedIn ? (
        <div>
          <Nav />
          <User />
          <Footer />
        </div>
      ) : (
        <SignInPage />
      )}
    </>
  );
};

export default UserPage;
