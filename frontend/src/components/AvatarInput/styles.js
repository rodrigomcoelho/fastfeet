import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px dashed #dddddd;
      background-color: #eee;
    }

    input {
      display: none;
    }
  }
`;

export const NoPreviewContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px dashed #dddddd;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #dddddd;

  svg {
    font-size: 48px;
  }

  p {
    font-size: 16px;
    font-weight: bold;
  }
`;
