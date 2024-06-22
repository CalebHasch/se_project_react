import "./ItemCard.css";

export default function ItemCard({ clothes, handleCardClick }) {
  return (
    <div
      className="item-card"
      onClick={() => {
        handleCardClick(clothes);
      }}
    >
      <p className="item-card__name">{clothes.name}</p>
      <img className="item-card__img" src={clothes.link} alt={clothes.name} />
    </div>
  );
}
