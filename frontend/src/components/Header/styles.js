import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 64px;
  background-color: #fff;
  border-bottom: 1.5px solid #dddddd;
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;

  img {
    width: 135px;
    height: 26px;
  }

  nav {
    flex: 1;
    margin-left: 30px;
    padding-left: 30px;
    border-left: 1px solid #eee;
  }

  aside {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    span {
      margin-bottom: 5px;
      text-align: right;
      letter-spacing: 0;
      color: #666666;
      font-weight: bold;
    }

    button {
      text-align: right;
      letter-spacing: 0;
      color: #de3b3b;
      background: none;
      border: 0;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const StyledLink = styled(Link)`
  text-transform: uppercase;
  font-size: 15px;
  color: ${props =>
    window.location.pathname.includes(props.to) ? '#444' : '#999'};
  font-weight: bold;
  letter-spacing: 0;

  transition: all 200ms;

  & + a {
    margin-left: 20px;
  }

  &:hover {
    color: #444444;
  }
`;
