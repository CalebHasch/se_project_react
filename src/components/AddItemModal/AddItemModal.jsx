import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

export default function AddItemModal({ onClose, isOpen, onAddItem }) {
  const { isLoading } = useContext(AppContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const formElements = {
    name: "add-card",
    title: "Add Garmet",
    buttonText: isLoading ? "Adding..." : "Add Garmet",
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values, handleReset);
  }

  function handleReset() {
    setValues({ name: "", imageUrl: "", weather: "" });
  }

  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      formElements={formElements}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        Name
        <input
          type="text"
          className="form__input"
          id="form__name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
        <span className="form__error"></span>
      </label>
      <label className="form__field">
        Image
        <input
          type="url"
          className="form__input"
          id="form__image-url"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        <span className="form__error"></span>
      </label>
      <div className="form__multiple-choice">
        <p className="form__subtitle">Select the weather type:</p>
        <div className="form__radio-field">
          <input
            type="radio"
            className="form__radio-input"
            name="weather"
            value={"hot"}
            id="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          <label className="form__radio-label" htmlFor="hot">
            Hot
          </label>{" "}
        </div>
        <div className="form__radio-field">
          <input
            type="radio"
            className="form__radio-input"
            name="weather"
            value={"warm"}
            id="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
            required
          />
          <label className="form__radio-label" htmlFor="warm">
            Warm
          </label>{" "}
        </div>
        <div className="form__radio-field">
          <input
            type="radio"
            className="form__radio-input"
            name="weather"
            value={"cold"}
            id="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
            required
          />
          <label className="form__radio-label" htmlFor="cold">
            Cold
          </label>
          <span className="form__error"></span>
        </div>
      </div>
    </ModalWithForm>
  );
}
