import "../Modal.css";
import "./ItemModal.css";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AppContext from "../../contexts/AppContext";

export default function ItemModal({ onClose, isOpen, clothingItem, onDelete }) {
  const { isLoading } = useContext(AppContext);
  const currentUser = useContext(CurrentUserContext);
  const [isOwn, setIsOwn] = useState(false);

  const cardDeleteButtonClassName = `card__delete-button ${isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"}`;

  useEffect(() => {
    if (currentUser) {
      setIsOwn(clothingItem.owner === currentUser._id);
    }
  }, [currentUser, clothingItem]);

  return (
    <div className={`modal ${isOpen && "modal_opened"}`} id="itemModal">
      <div className="modal__card card">
        <button
          className="card__close-button modal__close modal__close_color_white"
          type="button"
          aria-label="close"
          onClick={() => onClose()}
        ></button>
        <img
          className="card__image"
          alt={clothingItem.name}
          src={clothingItem.imageUrl}
        />
        <div className="card__container">
          <div>
            <p className="card__text">{clothingItem.name}</p>
            <p className="card__text">Weather: {clothingItem.weather}</p>
          </div>
          <button
            className={cardDeleteButtonClassName}
            type="button"
            aria-label="delete"
            onClick={onDelete}
          >
            {isLoading ? "Deleting..." : "Delete item"}
          </button>
        </div>
      </div>
    </div>
  );
}
