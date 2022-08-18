import React from "react";

function FormAuth({title, children, onSubmit, buttonText}) {
  return (
    <div className="auth__form-container">
      <h2 className="auth__form-title">{title}</h2>
      <form 
        className="form-auth auth__form-auth"
        onSubmit={onSubmit}
      >
        {children}
        <button className="form-auth__submit-button" type="submit">{buttonText}</button>
      </form> 
    </div>
  )
}

export default FormAuth;