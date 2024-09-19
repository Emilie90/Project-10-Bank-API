import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateUser } from "../reducers/reducers";

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: RootState) => state.signIn.signIn);
  const { profile, error } = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn && profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [isSignedIn, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Ajout du token si nécessaire
          },
          body: JSON.stringify({
            firstName,
            lastName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log(data);
      dispatch(updateUser(data.body));
    } catch (err) {
      console.error(err);
      // Gérer les erreurs
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return <p>You must be logged in to edit your profile.</p>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="firstName"
            placeholder={firstName}
            // value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            id="lastName"
            placeholder={lastName}
            // value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
