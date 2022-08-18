import React from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardDeleteButtonClassName = (
    `elements__item-delete ${!isOwn && 'elements__item-delete_hidden'}`
  );
  
  const cardLikeButtonClassName = (`element__heart ${isLiked && 'element__heart_active'}`)

  function handleClick() {
    onCardClick(card);
  }  

  function handleLikeClick(){
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="elements__item">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить это фото"></button>
      <figure className="element">
        <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
        <figcaption className="element__caption">
          <h2 className="element__place">{card.name}</h2>
          <div>
            <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
            <span className="element__like-number">{card.likes.length}</span>
          </div>
        </figcaption>
      </figure>
   </li>
  );
}

export default Card;
