import React from 'react'
import Popup from './Popup';

function ImagePopup(props) {
  return (
    <Popup
      name='view-image'
      container='view-container'
      isOpen={props.data.isOpen}
      onClose={props.onClose} 
    >
      <figure className="element-view">
        <img src={props.data.card.link} alt={props.data.card.name} className="element-view__image"/>
        <figcaption className="element-view__caption">
          <h2 className="element-view__place">{props.data.card.name}</h2>
        </figcaption>
      </figure>
    </Popup>
  )
}

export default ImagePopup;