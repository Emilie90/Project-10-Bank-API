import React from "react";
import Nav from "../components/Nav";
import User from "../components/User";
import Footer from "../components/Footer";
import "../css/main.css";

const UserPage: React.FC = () => {
  return (
    <div>
      <Nav />
      <User />
      <Footer />
    </div>
  );
};

export default UserPage;
