import { useState } from "react";
import "../css/main.css";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchUserProfile, isSignIn } from "../reducers/reducers"; // Ajout de fetchUserProfile
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.user.status);
  const token = useSelector((state: RootState) => state.user.token); // Accès au token depuis le store
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError(null); // Réinitialise les erreurs
    try {
      // Déroulement de l'action login
      const response = await dispatch(login({ email, password })).unwrap();

      // Assurez-vous d'extraire correctement le token de la réponse
      const token = response.body.token;
      if (token) {
        // Stocker le token dans le store
        await dispatch(fetchUserProfile());
        dispatch(isSignIn(true));
        // Rediriger l'utilisateur vers la page profil après la connexion réussie
        navigate("/user");
      } else {
        throw new Error("Token is missing");
      }
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
