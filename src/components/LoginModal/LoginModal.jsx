import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({ onClose, isOpen, onLogin, isLoading }) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const formElements = {
    name: "login",
    title: "Log In",
    buttonText: isLoading ? "Logging In..." : "Log In",
    linkText: "or Register",
    modal: "registration",
  };

  function handleChange(e, setter) {
    setter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(
      {
        email: emailValue,
        password: passwordValue,
      },
      handleReset
    );
  }

  function handleReset() {
    setEmailValue("");
    setPasswordValue("");
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
          id="form__password"
          name="password"
          placeholder="Password"
          value={passwordValue}
          onChange={(e) => handleChange(e, setPasswordValue)}
          required
        />
        <span className="form__error"></span>
      </label>
    </ModalWithForm>
  );
}
