import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  modal,
  onClose,
  onAddItem,
  clothingItems,
}) {
  const [nameValue, setNameValue] = useState("");
  const [imageUrlValue, setImageUrlValue] = useState("");
  const [weatherValue, setWeatherValue] = useState("");

  const formElements = {
    name: "add-card",
    title: "Add Garmet",
    buttonText: "Add Garmet",
  };

  function handleChange(e, setter) {
    setter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name: nameValue, link: imageUrlValue, weather: weatherValue });
    console.log({
      name: nameValue,
      link: imageUrlValue,
      weather: weatherValue,
    });
    onClose(modal);
    handleReset();
  }

  function handleReset() {
    setImageUrlValue("");
    setNameValue("");
    setWeatherValue("");
    console.log("reset");
  }

  return (
    <>
      <ModalWithForm
        modal={modal}
        onClose={onClose}
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
            id="form__image-link"
            name="link"
            placeholder="Image URL"
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
              onChange={(e) => handleChange(e, setWeatherValue)}
              required
            />
            <label className="form__radio-label">Cold</label>
            <span className="form__error"></span>
          </div>
        </div>
      </ModalWithForm>
    </>
  );
}
