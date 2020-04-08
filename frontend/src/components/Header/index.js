import React from 'react';

import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, StyledLink } from './styles';

import logo from '~/assets/images/fastfeet-logo.png';

export default function Header() {
  const dispatch = useDispatch();
  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />
        <nav>
          <StyledLink to="/deliveries">Entregas</StyledLink>
          <StyledLink to="/deliverymen">Entregadores</StyledLink>
          <StyledLink to="/recipients">Destinatários</StyledLink>
          <StyledLink to="/problems">Problemas</StyledLink>
        </nav>
        <aside>
          <span>Admin FastFeet</span>
          <button type="button" onClick={() => dispatch(signOut())}>
            Sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
