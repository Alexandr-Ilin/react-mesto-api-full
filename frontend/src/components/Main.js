import React from 'react'
import Card from '../components/Сard'
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main({onAddPlace, onCardClick, onEditAvatar, onEditProfile, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
    
  return (
    <main className="main-page">
      <section className="profile">
        <button className="profile__avatar-button" type="button" aria-label="Редактировать аватар" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar"/>
        </button>
        <div className="profile__profile-info">
          <div className="profile__edit-info">
            <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" aria-label="Редактирование профиля" name="edit-profile" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about-self">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={onAddPlace}></button>
      </section>
    
      <section className="elements-section">
        <ul className="elements">
           {cards.map(card => (
            < Card 
              card={card} 
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          ))} 
        </ul>
      </section>
    </main>
  )
}

export default Main;