import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function EditProfileModal({
  onClose,
  isOpen,
  onUpdate,
  isLoading,
}) {
  const user = useContext(CurrentUserContext);
  const [nameValue, setNameValue] = useState("");
  const [avatarUrlValue, setAvatarUrlValue] = useState("");

  const formElements = {
    name: "change-profile",
    title: "Change Profile Data",
    buttonText: isLoading ? "Updating..." : "Save Changes",
  };

  function handleChange(e, setter) {
    setter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({
      name: nameValue,
      avatar: avatarUrlValue,
    });
  }

  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      formElements={formElements}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        Name*
        <input
          type="text"
          className="form__input"
          name="name"
          placeholder="Name"
          value={nameValue}
          onChange={(e) => handleChange(e, setNameValue)}
          required
        />
        <span className="form__error"></span>
      </label>
      <label className="form__field">
        Avatar URL
        <input
          type="url"
          className="form__input"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={avatarUrlValue}
          onChange={(e) => handleChange(e, setAvatarUrlValue)}
        />
        <span className="form__error"></span>
      </label>
    </ModalWithForm>
  );
}
