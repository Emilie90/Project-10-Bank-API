import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../reducers/reducers";
import EditProfile from "./EditProfile"; // Importation du composant EditProfile

const Header = () => {
  const user = useSelector((state: RootState) => state.user.profile);
  const token = sessionStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();

  const [editMode, setEditMode] = useState(false); // État pour gérer l'affichage du formulaire d'édition

  useEffect(() => {
    const getData = async () => {
      if (token) {
        try {
          await dispatch(fetchUserProfile());
        } catch (error) {
          console.error("Erreur lors de la récupération du profil");
        }
      }
    };

    getData();
  }, [token, dispatch, user]);

  const handleEditClick = () => {
    setEditMode(true); // Passe en mode édition au clic sur le bouton
  };

  return (
    <div className="header">
      <h1>
        Welcome back <br />
        {user.firstName + " " + user.lastName}!
      </h1>

      {!editMode ? (
        // Afficher le bouton si on n'est pas en mode édition
        <Button
          classe="edit-button"
          content="Edit Name"
          click={handleEditClick}
        />
      ) : (
        // Afficher le composant EditProfile si on est en mode édition
        <EditProfile />
      )}
    </div>
  );
};

export default Header;
