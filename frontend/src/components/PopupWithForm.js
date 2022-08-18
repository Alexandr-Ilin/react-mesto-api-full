import React from 'react'
import Popup from './Popup';

function PopupWithForm({ title, name, isOpen, onClose, buttonText, children, onSubmit, }) {
  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
      container='form-container'
    >
      <h2 className="popup__form-header">{title}</h2>
      <form action="#" className="form" name={`form-${name}`} onSubmit={onSubmit}>
        <>{children}</>
        <button type="submit" className="form__submit-button">{buttonText}</button>
      </form>
    </Popup>
  )
}

export default PopupWithForm;