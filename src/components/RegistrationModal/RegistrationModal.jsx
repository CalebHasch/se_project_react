import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

export default function RegistrationModal({
  onClose,
  isOpen,
  onRegister,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const formElements = {
    name: "sign-up",
    title: "Sign Up",
    buttonText: isLoading ? "Creating..." : "Next",
    linkText: "or Log in",
    modal: "login",
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
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
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => handleChange(e, setValues)}
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
          value={values.name}
          onChange={(e) => handleChange(e, setValues)}
          required
        />
        <span className="form__error"></span>
      </label>
      <label className="form__field">
        Avatar URL
        <input
          type="url"
          className="form__input"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={(e) => handleChange(e, setValues)}
          required
        />
        <span className="form__error"></span>
      </label>
    </ModalWithForm>
  );
}
