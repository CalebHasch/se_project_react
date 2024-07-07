import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItem,
  isLoading,
}) {
  const [nameValue, setNameValue] = useState("");
  const [imageUrlValue, setImageUrlValue] = useState("");
  const [weatherValue, setWeatherValue] = useState("");

  const formElements = {
    name: "add-card",
    title: "Add Garmet",
    buttonText: isLoading ? "Adding..." : "Add Garmet",
  };

  function handleChange(e, setter) {
    setter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(
      {
        name: nameValue,
        imageUrl: imageUrlValue,
        weather: weatherValue,
      },
      handleReset
    );
  }

  function handleReset() {
    setImageUrlValue("");
    setNameValue("");
    setWeatherValue("");
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
          value={nameValue}
          onChange={(e) => handleChange(e, setNameValue)}
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
          value={imageUrlValue}
          onChange={(e) => handleChange(e, setImageUrlValue)}
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
            checked={weatherValue === "hot"}
            onChange={(e) => handleChange(e, setWeatherValue)}
            required
          />
          <label className="form__radio-label">Hot</label>{" "}
        </div>
        <div className="form__radio-field">
          <input
            type="radio"
            className="form__radio-input"
            name="weather"
            value={"warm"}
            checked={weatherValue === "warm"}
            onChange={(e) => handleChange(e, setWeatherValue)}
            required
          />
          <label className="form__radio-label">Warm</label>{" "}
        </div>
        <div className="form__radio-field">
          <input
            type="radio"
            className="form__radio-input"
            name="weather"
            value={"cold"}
            checked={weatherValue === "cold"}
            onChange={(e) => handleChange(e, setWeatherValue)}
            required
          />
          <label className="form__radio-label">Cold</label>
          <span className="form__error"></span>
        </div>
      </div>
    </ModalWithForm>
  );
}
