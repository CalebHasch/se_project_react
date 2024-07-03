import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

export default function ClothesSection({
  clothes,
  handleCardClick,
  handleButtonClick,
  modal,
}) {
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
            <li key={item._id}>
              <ItemCard clothes={item} handleCardClick={handleCardClick} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
