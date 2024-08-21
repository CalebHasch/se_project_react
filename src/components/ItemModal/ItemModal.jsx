import "../Modal.css";
import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ItemModal({
  onClose,
  isOpen,
  clothingItem,
  onDelete,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  let isOwn;
  if (currentUser) {
    isOwn = clothingItem.owner === currentUser._id;
  }
  const cardDeleteButtonClassName = `card__delete-button ${isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"}`;

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
