import React from "react";
import okPath from '../images/ok.svg'
import errorPath from '../images/error.svg'
import Popup from "./Popup";

function InfoTooltip({isOpen, result, onClose}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      name='info-tool'
      container='info-container'
    >
      <img className="popup__info-image" src={result ? okPath : errorPath} alt={result ? 'Успешно' : 'Что-то не так'} />
      <h2 className="popup__info-header">{result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
    </Popup>
  )
}

export default InfoTooltip;