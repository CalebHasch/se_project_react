import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  clothes,
  handleCardClick,
  handleButtonClick,
  modal,
}) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothes={clothes}
        handleCardClick={handleCardClick}
        handleButtonClick={handleButtonClick}
        modal={modal}
      />
    </div>
  );
}
