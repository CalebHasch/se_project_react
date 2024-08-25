import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { ActiveModalContext } from "../../contexts/ActiveModalContext";
import AppContext from "../../contexts/AppContext";

export default function LoginModal({ onLogin }) {
  const { activeModal } = useContext(ActiveModalContext);
  const { isLoading } = useContext(AppContext);
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const formElements = {
    name: "login",
    title: "Log In",
    buttonText: isLoading ? "Logging In..." : "Log In",
    linkText: "or Register",
    modal: "registration",
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values, handleReset);
  }

  function handleReset() {
    setValues({ email: "", password: "" });
  }

  return (
    <ModalWithForm
      isOpen={activeModal === "login"}
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
          value={values.email}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
          required
        />
        <span className="form__error"></span>
      </label>
    </ModalWithForm>
  );
}
