import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 36px;
  position: relative;

  margin-bottom: 20px;

  input {
    max-height: 100%;
    width: 237px;
    padding: 8px 40px;
    border: 1px solid #dddddd;
    border-radius: 4px;

    &::placeholder {
      color: #999999;
    }
  }

  > svg {
    position: absolute;
    font-size: 20px;
    color: #999;
    left: 15px;
    top: 8px;
  }

  a {
    max-height: 100%;
    width: 142px;
    background-color: #7d40e7;
    border-radius: 4px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;

    transition: background 200ms;

    &:hover {
      background-color: ${lighten(0.1, '#7d40e7')};
    }

    svg {
      font-size: 24px;
      color: #fff;
      left: 15px;
      top: 8px;
      margin-right: 5px;
    }
  }
`;
