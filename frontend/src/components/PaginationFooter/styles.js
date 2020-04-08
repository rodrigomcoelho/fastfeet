import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;

  span {
    color: #666;
    font-weight: bold;
  }
`;

export const Button = styled.button`
  background-color: #7d40e7;
  border: none;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  border-radius: 4px;
  font-weight: bold;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
`;
