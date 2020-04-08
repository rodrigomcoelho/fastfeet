import styled from 'styled-components';

export const ContainerCheck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    position: relative;
    color: #666;
    font-size: 14px;
    font-weight: bold;
  }

  input[type='checkbox'] {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  input[type='checkbox'] + label {
    position: relative;
    cursor: pointer;
    padding-left: 30px;
  }

  input[type='checkbox'] + label::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    left: 0px;
    top: -3px;
    border: solid 2px;
    border-radius: 4px;
    background-color: #fff;
  }

  input[type='checkbox']:checked + label::after {
    content: '';
    position: absolute;
    left: 6px;
    bottom: 4px;
    width: 5px;
    height: 12px;
    border-right: solid 3px #333;
    border-bottom: solid 3px #333;
    transform: rotate(45deg);
  }
`;
