import { useContext } from "react";
import { ActiveModalContext } from "../../contexts/ActiveModalContext";
import AppContext from "../../contexts/AppContext";
import "./ModalWithForm.css";
import "../Modal.css";

export default function ModalWithForm({
  isOpen,
  formElements,
  onSubmit,
  children,
}) {
  const { closeModal } = useContext(AppContext);
  const setActiveModal = useContext(ActiveModalContext);

  function changeModal() {
    setActiveModal(formElements.modal);
  }

  return (
    <div
      className={`modal ${isOpen && "modal_opened"} `}
      id={`${formElements.name}-modal`}
    >
      <form
        className="modal__form form"
        id={`${formElements.name}-form`}
        name={formElements.name}
        onSubmit={onSubmit}
      >
        <button
          className="form__close-button modal__close"
          type="button"
          aria-label="close"
          onClick={closeModal}
        />
        <fieldset className="form__set">
          <p className="form__title">{formElements.title}</p>
          {children}
        </fieldset>
        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button form__submit-button_inactiv"
            // disabled
          >
            {formElements.buttonText}
          </button>
          {formElements.linkText && (
            <p className="form__link" onClick={changeModal}>
              {formElements.linkText}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
