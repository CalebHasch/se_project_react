import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ActiveModalContext } from "../../contexts/ActiveModalContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import AppContext from "../../contexts/AppContext";

export default function EditProfileModal({ onUpdate }) {
  const { activeModal } = useContext(ActiveModalContext);
  const { isLoading } = useContext(AppContext);
  const user = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: user.name || "",
    avatarUrl: user.avatar || "",
  });

  const formElements = {
    name: "change-profile",
    title: "Change Profile Data",
    buttonText: isLoading ? "Updating..." : "Save Changes",
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values);
  }

  useEffect(() => {
    if (user) {
      setValues({ name: user.name || "", avatarUrl: user.avatar || "" });
    }
  }, [user, setValues]);

  return (
    <ModalWithForm
      isOpen={activeModal === "edit-profile"}
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
          value={values.name}
          onChange={handleChange}
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
          value={values.avatarUrl}
          onChange={handleChange}
          required
        />
        <span className="form__error"></span>
      </label>
    </ModalWithForm>
  );
}
