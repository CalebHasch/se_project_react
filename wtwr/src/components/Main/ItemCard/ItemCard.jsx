import "./ItemCard.css";

export default function ItemCard({ clothes }) {
  return (
    <div className="itemCard">
      <h3>{clothes.name}</h3>
      <img className="itemCardImg" src={clothes.link} />
    </div>
  );
}
