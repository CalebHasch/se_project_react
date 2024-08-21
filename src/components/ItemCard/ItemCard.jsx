import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

export default function ItemCard({ clothes, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    onCardLike(clothes);
  }

  const cardLikeButtonClassName = `item-card__like-icon ${isLiked && "item-card__like-icon_active"}`;

  useEffect(() => {
    if (currentUser) {
      setIsLiked(clothes.likes.includes(currentUser._id));
    }
  }, [currentUser, clothes, setIsLiked]);

  return (
    <div className="item-card">
      <div className="item-card__container">
        <p className="item-card__name">{clothes.name}</p>
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLike}
          aria-label="like"
        ></button>
      </div>
      <img
        className="item-card__img"
        src={clothes.imageUrl}
        onClick={() => {
          handleCardClick(clothes);
        }}
        alt={clothes.name}
      />
    </div>
  );
}
