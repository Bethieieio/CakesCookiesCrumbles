import { useState } from "react";
import { useCurrentUser } from "./context/CurrentUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/fontawesome-free-solid";
import { faHeart as faHeartO } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FavouriteToggle = (props) => {
  const { id, favouriteId } = props;
  const [loading, setLoading] = useState(false);
  const [favourited, setFavourited] = useState(favouriteId);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const removeFavourite = async () => {
    setLoading(true);
    await axios.delete(`/favourites/${favourited}`);
    setLoading(false);
    setFavourited(false);
  };
  const addFavourite = async () => {
    setLoading(true);
    const result = await axios.post("/favourites/", { recipe: id });
    setLoading(false);
    if (result.data) setFavourited(result.data.id);
  };
  return !currentUser ? (
    <FontAwesomeIcon
      className="heart"
      icon={faHeartO}
      onClick={() => {
        navigate("/login");
      }}
      aria-label="Add recipe to favourites"
    />
  ) : favourited ? (
    <FontAwesomeIcon
      className="heart"
      beatFade={loading}
      icon={faHeart}
      onClick={removeFavourite}
      aria-label="Remove from favourite"
    />
  ) : (
    <FontAwesomeIcon
      className="heart"
      beatFade={loading}
      icon={faHeartO}
      onClick={addFavourite}
      aria-label="Add recipe to favourites"
    />
  );
};
