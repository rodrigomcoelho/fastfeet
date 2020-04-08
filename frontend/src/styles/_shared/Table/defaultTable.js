import styled from 'styled-components';
import { darken } from 'polished';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  table-layout: auto;
`;

export const Thead = styled.thead`
  th {
    text-align: left;
    padding-left: 15px;

    &:first-child {
      ${props => (props.firstWith ? `width: ${props.firstWith}px;` : '')}
    }

    &:last-child {
      padding-left: 0;
      text-align: center;
      width: 80px;
    }
  }
`;

export const Tbody = styled.tbody`
  tr {
    background-color: #fff;
    color: #666666;
    height: 55px;

    transition: all 200ms;

    &:hover {
      color: ${darken(0.3, '#666666')};
      box-shadow: 0 2px 8px #666;
    }

    td {
      padding-left: 15px;

      p {
        max-width: 80ch;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:first-child {
        border-radius: 4px 0 0 4px;
      }

      &:last-child {
        padding-left: 0;
        border-radius: 0 5px 5px 0;
        height: 4px;
        color: #c6c6c6;
        text-align: center;
        width: 20px;
      }
    }
  }
`;
