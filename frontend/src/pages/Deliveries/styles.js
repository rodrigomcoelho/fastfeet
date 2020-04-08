import styled from 'styled-components';

export const TableDataStatus = styled.div.attrs(props => {
  if (props.status === 'complete')
    return { color: '#2CA42B', background: '#DFF0DF' };
  if (props.status === 'pending')
    return { color: '#C1BC35', background: '#F0F0DF' };
  if (props.status === 'ongoing')
    return { color: '#4D85EE', background: '#BAD2FF' };
  if (props.status === 'canceled')
    return { color: '#DE3B3B', background: '#FAB0B0' };
  return { color: '#666', background: '#F0F0DF' };
})`
  max-width: 100%;
  max-height: 100%;

  > span {
    padding: 4px 8px 4px 0;
    background-color: ${props => props.background};
    border-radius: 12px;

    color: ${props => props.color};

    font-weight: bold;

    display: inline-flex;

    text-transform: uppercase;

    svg {
      width: 15px;
      height: 15px;
      margin-left: 6px;
      margin-right: 2px;
    }
  }
`;

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
