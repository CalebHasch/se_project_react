import "./ModalWithForm.css";

export default function ModalWithForm() {
  return (
    <div className="modal" id="add-card-modal">
      <form className="modal__form form" id="form-add-card">
        <button
          className="form__close-button modal__close"
          type="button"
          aria-label="close"
        ></button>
        <h2 className="form__title">New Garment</h2>
        <fieldset className="form__set">
          <label className="form__field">
            <input
              type="text"
              className="form__input"
              id="form__name"
              name="name"
              placeholder="Name"
              required
              maxLength="30"
            />
            <span className="form__error"></span>
          </label>
          <label className="form__field">
            <input
              type="url"
              className="form__input"
              id="form__image-link"
              name="link"
              placeholder="Image link"
              required
            />
            <span className="form__error"></span>
          </label>
          <label className="form__field">
            <input
              type="radio"
              className="form__input"
              name="weather"
              required
            />
            Hot
            <span className="form__error"></span>
          </label>
          <label className="form__field">
            <input
              type="radio"
              className="form__input"
              name="weather"
              required
            />
            Warm
            <span className="form__error"></span>
          </label>
          <label className="form__field">
            <input
              type="radio"
              className="form__input"
              name="weather"
              required
            />
            Cold
            <span className="form__error"></span>
          </label>
        </fieldset>
        <button
          type="submit"
          className="form__submit-button form__submit-button_inactive"
          disabled
        >
          Create
        </button>
      </form>
    </div>
  );
}
