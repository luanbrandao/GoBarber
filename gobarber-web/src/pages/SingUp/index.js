import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';
// import { Container } from './styles';

export default function SingUp() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form>
        <input placeholder="Nome Completo" />
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Seu senha secreta" />

        <button type="submit">Criar Conta</button>
        <Link to="/">já tenho login</Link>
      </form>
    </>
  );
}
