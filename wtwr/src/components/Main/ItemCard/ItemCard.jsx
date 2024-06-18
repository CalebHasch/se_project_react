import "./ItemCard.css";

export default function ItemCard({ clothes }) {
  return (
    <div className="item-card">
      <p className="item-card__name">{clothes.name}</p>
      <img className="item-card__img" src={clothes.link} />
    </div>
  );
}
