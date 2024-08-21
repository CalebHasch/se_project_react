import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

export default function ClothesSection({
  clothes,
  handleCardClick,
  handleButtonClick,
  handleCardLike,
  modal,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your Items</p>
        <button
          className="clothes-section__button"
          onClick={() => handleButtonClick(modal)}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothes.map((item) => {
          return (
            item.owner === currentUser._id && (
              <li key={item._id}>
                <ItemCard
                  clothes={item}
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
