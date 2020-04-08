import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #444444;
    margin: 30px 0;
  }
`;

export const FormContainer = styled.div`
  max-width: 900px;
  margin: 27px auto;
  position: relative;

  form {
    input {
      max-height: 45px;
      width: 100%;
      padding: 12px 20px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      font-size: 16px;
    }

    label {
      color: #444444;
      font-weight: bold;
    }

    select {
      max-height: 45px;
      width: 100%;
      padding: 12px 20px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      font-size: 16px;
      background: none;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 5px 0 0;
      font-weight: bold;
    }
  }
`;
