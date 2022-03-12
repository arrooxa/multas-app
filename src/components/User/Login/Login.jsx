import React, { useState, useContext } from "react";
import StoreContext from "components/Store/Context";
import { useHistory } from "react-router-dom";
import UIButton from "components/UI/Button/Button";

import "./Login.css";

function initialState() {
  return { user: "", password: "" };
}

async function login({ user, password }) {
  const response = await fetch("http://localhost:3000/usuarios");

  const data = await response.json();

  const userArray = Object.values(data).filter((item) => item["nome"] === user);

  if (userArray.length !== 0) {
    if (userArray[0].senha === password) {
      return { token: true };
    }
  }

  return { error: "Usuário ou senha inválido" };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  async function onSubmit(event) {
    event.preventDefault();

    const { token, error } = await login(values);

    if (token) {
      setToken(token);
      return history.push("/home");
    }

    setValues(initialState);
    setError(error);
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
            type="text"
            name="user"
            onChange={onChange}
            value={values.user}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>
        {error && <div className="user-login__error">{error}</div>}
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
