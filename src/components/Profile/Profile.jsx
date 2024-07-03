import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({ clothes, handleCardClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection clothes={clothes} handleCardClick={handleCardClick} />
    </div>
  );
}
