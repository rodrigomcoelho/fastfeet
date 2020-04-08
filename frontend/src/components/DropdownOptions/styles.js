import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  span {
    position: relative;
    border: none;
    background: none;
    color: #666;
    cursor: pointer;

    &:hover {
      color: ${darken(0.4, '#666666')};
    }

    ul {
      position: absolute;
      display: flex;
      right: -50px;
      max-width: 200px;
      max-height: 120px;
      background-color: #fff;
      box-shadow: 0px 0px 2px #00000026;
      border-radius: 4px;
      z-index: 1;
      flex-direction: column;

      justify-content: space-evenly;

      top: 25px;

      &::before {
        content: '';
        position: absolute;
        right: 48px;
        /* right: calc(50% - 40px); */
        top: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #00000026;
      }
      li {
        font-weight: bold;
        height: 100%;
        width: 100%;
        padding: 0;
        min-width: 150px;
        flex: 1;

        svg {
          margin-right: 6px;
          margin-left: 10px;
        }

        a {
          text-decoration: none;
          color: #999;
          display: flex;
          padding: 10px;

          align-items: center;
        }

        &:hover {
          border-radius: 4px;
          box-shadow: 0 2px 8px #bbb;

          a,
          button {
            color: #444;
          }
        }

        button {
          padding: 10px;
        }

        & + li {
          section {
            border-top: 1px solid #eee;
          }
        }
      }
    }
  }
`;
