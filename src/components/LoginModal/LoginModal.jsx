import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

export default function LoginModal({ onClose, isOpen, onLogin, isLoading }) {
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
          value={values.email}
          onChange={(e) => handleChange(e, setValues)}
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
          onChange={(e) => handleChange(e, setValues)}
          required
        />
        <span className="form__error"></span>
      </label>
    </ModalWithForm>
  );
}
