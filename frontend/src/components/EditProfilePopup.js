import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { useForm } from '../utils/useForm'

function EditProfilePopup({isOpen, onClose, onUpdateUser, isRenderLoading}) {
  const currentUser = React.useContext(CurrentUserContext);

  const data = useForm({user: currentUser.name , character: currentUser.about})

  React.useEffect(() => {
    data.setValues({
      user: currentUser.name, 
      character: currentUser.about
    })
  },[isOpen])
   
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      user: data.values.user,
      character: data.values.character,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isRenderLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}>
      <input value={data.values.user || ''} onChange={data.handleChange} required minLength="2" maxLength="40" type="text" className="form__item form__item_type_name" name="user" placeholder="Имя"/>
      <span className="form__error-message form__error-message_type_user"> </span>
      <input value={data.values.character || ''} onChange={data.handleChange} required minLength="2" maxLength="200" type="text" className="form__item form__item_type_about" name="character" placeholder="О себе"/>
      <span className="form__error-message form__error-message_type_character"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;