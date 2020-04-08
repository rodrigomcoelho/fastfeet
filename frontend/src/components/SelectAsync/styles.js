import styled from 'styled-components';
import SelectAsync from 'react-select/async';

export const Select = styled(SelectAsync)`
  font-size: 16px;

  max-height: 45px;
  width: 100%;

  div.react-select__control {
    padding: 3px 10px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 8px 0;

  label {
    margin-bottom: 9px;
  }
`;
