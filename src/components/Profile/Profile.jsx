import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  clothes,
  handleCardClick,
  handleButtonClick,
  handleLogout,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <SideBar onOpen={handleButtonClick} onLogout={handleLogout} />
      <ClothesSection
        clothes={clothes}
        handleCardClick={handleCardClick}
        handleButtonClick={handleButtonClick}
        handleCardLike={handleCardLike}
      />
    </div>
  );
}
