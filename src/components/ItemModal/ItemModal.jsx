import "../Modal.css";
import "./ItemModal.css";

export default function ItemModal({ onClose, clothingItem, modal, onDelete }) {
  return (
    <div className="modal" id="itemModal">
      <div className="modal__card card">
        <button
          className="card__close-button modal__close modal__close_color_white"
          type="button"
          aria-label="close"
          onClick={() => onClose(modal)}
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
            className="card__delete-button"
            type="button"
            aria-label="delete"
            onClick={onDelete}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
