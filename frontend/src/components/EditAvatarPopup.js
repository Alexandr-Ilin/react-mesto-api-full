import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isRenderLoading}) {
  
  const avatarRef = React.useRef()

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 
  
  return (
    <PopupWithForm
      title='Обновить аватар'
      name='chenge-avatar'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isRenderLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}>
      <input ref={avatarRef} required type="url" className="form__item form__item_type_avatar" name="avatar" placeholder="Ссылка на аватар"/>
      <span className="form__error-message form__error-message_type_avatar"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;