import { useState } from "react";
import "../css/main.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/userSlice";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.user.status);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError(null); // Réinitialise les erreurs
    try {
      await dispatch(login({ email, password })).unwrap();
      // Unwrap pour récupérer les données ou lancer une erreur
      navigate("/user");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          type="submit"
          className="sign-in-button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
};

export default SignIn;
