import "./ModalWithForm.css";
import "../Modal.css";

export default function ModalWithForm({
  onClose,
  modal,
  formElements,
  children,
}) {
  return (
    <div className="modal" id={`${formElements.name}-modal`}>
      <form
        className="modal__form form"
        id={`${formElements.name}-form`}
        name={formElements.name}
      >
        <button
          className="form__close-button modal__close"
          type="button"
          aria-label="close"
          onClick={() => onClose(modal)}
        ></button>
        <fieldset className="form__set">
          <p className="form__title">{formElements.title}</p>
          {children}
        </fieldset>
        <button
          type="submit"
          className="form__submit-button form__submit-button_inactiv"
          // disabled
        >
          {formElements.buttonText}
        </button>
      </form>
    </div>
  );
}
