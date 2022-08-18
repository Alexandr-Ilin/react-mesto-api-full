import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../utils/useForm'

function AddPlacePopup({isOpen, onClose, onAddPlace, isRenderLoading}) {

  const data = useForm({name: '', link:''})

  React.useEffect(() => {
    data.setValues({name: '', link:''})
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: data.values.name,
      link: data.values.link 
    })
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isRenderLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}>
      <input value={data.values.name || ''} onChange={data.handleChange} required minLength="2" maxLength="30" type="text" className="form__item form__item_type_place" name="name" placeholder="Название"/>
      <span className="form__error-message form__error-message_type_name"></span>
      <input  value={data.values.link || ''} onChange={data.handleChange} required type="url" className="form__item form__item_type_link" name="link" placeholder="Ссылка на картинку"/>
      <span className="form__error-message form__error-message_type_link"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;