import React from "react";

import FormAuth from "./FormAuth";

function Login({handleLogin}) {
  const [formParams, setFormParams] = React.useState({
    email: '',
    password: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    handleLogin(formParams)
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
        title={'Вход'}
        onSubmit={handleSubmit}
        buttonText={'Войти'}
      >
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formParams.email}
          onChange={handleChange}
          className="form-auth__input"
          maxLength="40"
          required
        />

      <input 
          type="password"
          name="password"
          placeholder="Пароль"
          value={formParams.password}
          onChange={handleChange}
          className="form-auth__input"
          minLength= "5"
          maxLength="10"
          required
        />
      </FormAuth>
    </section>
  )
}

export default Login;