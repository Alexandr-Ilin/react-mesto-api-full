import React from "react";
import { Link } from "react-router-dom";
import FormAuth from "./FormAuth";

function Register({handleRegister}) {

  const [formParams, setFormParams] = React.useState({
    email: '',
    password: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    handleRegister(formParams)
  } 

  function handleChange(e) {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="auth">
      <FormAuth
        title={'Регистрация'}
        onSubmit={handleSubmit}
        buttonText={'Зарегистрироваться'}
      >
        
        <input 
          type='email'
          name='email'
          placeholder='Email'
          value={formParams.email}
          onChange={handleChange}
          className="form-auth__input"
          maxLength='40'
          required
        />

      <input 
          type='password'
          name='password'
          placeholder='Пароль'
          value={formParams.password}
          onChange={handleChange}
          className="form-auth__input"
          minLength= '5'
          maxLength='10'
          required
        />

      </FormAuth>
      <Link className="auth__auth-link" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;