import React from "react";
import Nav from "../components/Nav";
import SignIn from "../components/SignIn";
import Footer from "../components/Footer";
import "../css/main.css";

const SignInPage: React.FC = () => {
  return (
    <div>
      <Nav />
      <SignIn />
      <Footer />
    </div>
  );
};

export default SignInPage;
