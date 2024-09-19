import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/SignInPage";
import "./css/main.css";
import UserPage from "./pages/UserPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/index" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/profile" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
