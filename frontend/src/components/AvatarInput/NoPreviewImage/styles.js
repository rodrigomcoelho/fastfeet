import styled from 'styled-components';

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
