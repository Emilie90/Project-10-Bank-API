import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchUserProfile } from "../reducers/reducers";
import { NavLink } from "react-router-dom";

const Header = () => {
  const user = useSelector((state: RootState) => state.user.profile);
  const token = sessionStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (token) {
        try {
          console.log("token", token);
          await dispatch(fetchUserProfile());
          console.log(user.body);
        } catch (error) {
          console.error("Erreur lors de la récupération du profil");
        }
      }
    };

    getData();
  }, [token, dispatch, user]);

  return (
    <div className="header">
      <h1>
        Welcome back <br />
        {user.firstName + " " + user.lastName}!
      </h1>
      <NavLink to="/profile">
        <Button classe="edit-button" content="Edit Name" click={null} />
      </NavLink>
    </div>
  );
};

export default Header;
