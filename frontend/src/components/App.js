import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../context/CurrentUserContext';
import {api} from '../utils/api'
import * as auth from '../utils/auth.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState({ isOpen: false, card:{} })
  const [isInfoTooltipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState({ isOpen: false, result: '' })
  const [selectedCard, setSelectedCard] = React.useState({ isOpen:false, card:{} });

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [renderLoading, setRenderLoading] = React.useState(false)

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('')

  const history = useHistory()

  React.useEffect(() => {
    console.log(document.cookie, 'cookie1')
   },[history])

  React.useEffect(() => {
    
    console.log('loggedIn', loggedIn)
    api.getUserData()
    .then((res) => {
      console.log(res, 'resultUser')
      setLoggedIn(true);
      setCurrentUser(res.data)
      setEmail(res.data.email);
      history.push('/');
    })
    .catch((err) => {
      console.log('unautoriz')
      console.log(err);
    })

    api.getInitialCards()
      .then((res) => {
      setCards(res)
    })
      .catch((err) => {
        console.log(err);
      })


  },[history, loggedIn])

  // React.useEffect(() => {
  //   if (localStorage.getItem('jwt')) {
  //     const jwt = localStorage.getItem('jwt')
  //     auth.checkToken(jwt)
  //       .then((res) => {
  //         console.log('здесь')
  //         setEmail(res.data.email)
  //         setLoggedIn(true)
  //         history.push('/')
  //       })
  //       .catch((err) => {
  //         console.log('нездесь')
  //         console.log(err)
  //         history.push('/sign-in')
  //       })
  //   }
  // },[history])

  //открытие/закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false)
    setSelectedCard({isOpen:false, card:{}})
    setIsInfoToolTipPopupOpen({isOpen: false, result:''})
  }

  function handleCardClick(card) {
    setSelectedCard({isOpen:true, card:card})
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeletePlaceClick(card) {
    setIsDeletePlacePopupOpen({isOpen:true, card:card})
  }


  //функции обновления данных
  function handleUpdateUser({user, character}) {
    setRenderLoading(true)
    api.changeUserData({ user, character })
      .then((data) => {
         setCurrentUser(data.data)
         closeAllPopups()
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    setRenderLoading(true)
    api.chengeAvatar(avatar)
      .then((data) => {
        console.log(data, 'avatar')
        setCurrentUser({...currentUser, avatar: data.data.avatar})
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    setRenderLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(itemCard => itemCard._id === card._id ? false : true)
        setCards(newCards)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    setRenderLoading(true)
    api.addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function handleInfoToolTipPopupOpen(result){
    setIsInfoToolTipPopupOpen({isOpen: true, result: result})
  }

  function handleRegister ({ email, password }) {
    return auth.register({password, email})
    .then(() => {
      history.push('/sign-in');
      handleInfoToolTipPopupOpen(true)
    })
    .catch((err) => {
      console.log(err)
      handleInfoToolTipPopupOpen(false)
    })
  }

  function handleLogin ({ email, password }) {
    return auth.authorize(password, email)
        .then((res) => {
          console.log(res, 'datalogin')
            console.log(res)
            console.log('вошел')
            setEmail(email)
            setLoggedIn(true)
            history.push('/')
        })
        .catch((err) => {
          console.log(err, '0err')
          handleInfoToolTipPopupOpen(false)
        })
  }

  function handleSignOut() {
    auth.exitUserProfile()
      .then(res => {
          setLoggedIn(false);
          setEmail('');
          history.push('/sign-in');
      })
      .catch(err => {
         console.log(err);
      })
  }
  // function handleSignOut() {
  //    console.log('err');
  // }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

      <Switch>

        <Route exact path='/sign-in'>
          < Header
            headerLinkPath='/sign-up'
            headerLinkText='Регистрация'
          />

          < Login
            handleLogin={handleLogin}
          />
        </Route>

        <Route exact path='/sign-up'>

          < Header
            headerLinkPath='/sign-in'
            headerLinkText='Авторизация'
          />

          < Register
            handleRegister={handleRegister}
          />
        </Route>


        <ProtectedRoute
          exact path='/'
          loggedIn={loggedIn}
        >
          < Header
            loggedIn={loggedIn}
            email={email}
            buttonText={'Выйти'}
            signOut={handleSignOut}

          />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeletePlaceClick}
          />

          < Footer />
        </ProtectedRoute>

      </Switch>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isRenderLoading={renderLoading}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isRenderLoading={renderLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isRenderLoading={renderLoading}
      />

      <ImagePopup
        data={selectedCard}
        onClose={closeAllPopups}
      />

      <DeletePlacePopup
        isOpen={isDeletePlacePopupOpen.isOpen}
        card={isDeletePlacePopupOpen.card}
        onClose={closeAllPopups}
        onDelete={handleCardDelete}
        isRenderLoading={renderLoading}
      />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen.isOpen}
        result={isInfoTooltipPopupOpen.result}
        onClose={closeAllPopups}
      />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
