import React from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import "../css/main.css";

const HomePage: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
