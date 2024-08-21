import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegistrationModal({
  onClose,
  isOpen,
  onRegister,
  isLoading,
}) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [avatarUrlValue, setAvatarUrlValue] = useState("");

  const formElements = {
    name: "sign-up",
    title: "Sign Up",
    buttonText: isLoading ? "Creating..." : "Next",
    linkText: "or Log in",
    modal: "login",
  };

  function handleChange(e, setter) {
    setter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(
      {
        email: emailValue,
        password: passwordValue,
        name: nameValue,
        avatar: avatarUrlValue,
      },
      handleReset
    );
  }

  function handleReset() {
    setEmailValue("");
    setPasswordValue("");
    setAvatarUrlValue("");
    setNameValue("");
  }
  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      formElements={formElements}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        Email
        <input
          type="email"
          className="form__input"
          name="email"
          placeholder="Email"
          value={emailValue}
          onChange={(e) => handleChange(e, setEmailValue)}
          required
        />
        <span className="form__error"></span>
      </label>
      <label className="form__field">
        Password
        <input
          type="password"
          className="form__input"
          name="password"
          placeholder="Password"
          value={passwordValue}
          onChange={(e) => handleChange(e, setPasswordValue)}
          required
        />
        <span className="form__error"></span>
      </label>
      <label className="form__field">
        Name
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
          required
        />
        <span className="form__error"></span>
      </label>
    </ModalWithForm>
  );
}
