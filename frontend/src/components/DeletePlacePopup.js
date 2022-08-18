import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup({isOpen, card, onClose, onDelete, isRenderLoading} ) {

  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  } 

  return (
    <PopupWithForm
      title='Вы уверены?'
      name='delete-card'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isRenderLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
      >
    </PopupWithForm>
  )
}

export default DeletePlacePopup;