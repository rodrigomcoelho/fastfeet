import styled from 'styled-components';

export const ButtonSection = styled.div`
  height: 36px;
  position: absolute;
  top: 0;
  right: 0;

  a {
    margin-right: 16px;
  }
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  input[type='text'] {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }
`;
