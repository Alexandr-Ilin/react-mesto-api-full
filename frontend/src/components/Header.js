import React from 'react'
import logoPath from '../images/logo1.svg'
import { Link } from 'react-router-dom'

function Header({loggedIn, headerLinkPath, headerLinkText, email, buttonText, signOut}) {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false)

  function handleClickMenu() {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <header className='header'>
      
      <div className='header__with-logo'>
        <img src={logoPath} alt="Логотип проекта Место" className="header__logo"/>
        {!loggedIn && <Link className="header__link" to={headerLinkPath}>{headerLinkText}</Link>}
        {loggedIn && <button type="button" onClick={handleClickMenu} className={` header__button ${isOpenMenu ? 'header__button_type_close' : 'header__button_type_menu'}`}></button>}
      </div>

      {loggedIn && (
        <div className={`header__context-container ${isOpenMenu ? 'header__context-container_visible' : ''}`}>
          <p className='header__email'>{email}</p>
          {loggedIn ? <button type="button" onClick={signOut} className='header__button-signout'>{buttonText}</button> : <Link className="header__link" to={headerLinkPath}>{headerLinkText}</Link>}
        </div>
      )}

    </header>
  )
}
  
export default Header;
// &#8801