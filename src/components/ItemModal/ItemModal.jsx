import "../Modal.css";
import "./ItemModal.css";

export default function ItemModal({
  onClose,
  isOpen,
  clothingItem,
  onDelete,
  isLoading,
}) {
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
            className="card__delete-button"
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
