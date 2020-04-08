import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkBack = styled(Link)`
  padding: 10px;
  width: 112px;
  text-transform: uppercase;

  background-color: #cccccc;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 20px;
  }
`;
