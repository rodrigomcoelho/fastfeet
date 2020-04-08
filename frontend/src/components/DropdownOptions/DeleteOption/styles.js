import styled from 'styled-components';

export const ButtonDelete = styled.button`
  height: 100%;
  width: ${props => (props.increaseWith ? '100%' : '190px')};
  background: none;
  border: none;
  /* padding: 10px 10px; */
  display: flex;
  font-weight: bold;
  color: #999;
  align-items: center;
`;
