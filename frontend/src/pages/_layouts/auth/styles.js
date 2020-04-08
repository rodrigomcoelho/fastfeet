import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background-color: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  /* max-height: 425px; */
  background-color: #fff;
  text-align: center;

  padding-top: 60px;
  padding-bottom: 60px;

  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    padding: 0 30px;

    input {
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 45px;
      padding: 12px 15px;
      color: #fff;

      margin-top: 10px;

      color: #333;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 5px 0 0;
      font-weight: bold;
    }

    button {
      margin: 15px 0 0;
      height: 44px;
      background-color: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background-color: ${darken(0.05, '#7D40E7')};
      }
    }
  }
`;

export const Label = styled.label`
  margin-top: 15px;
  justify-self: flex-start;
  color: #444444;
  height: 19px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;
