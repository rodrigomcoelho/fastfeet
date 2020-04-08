import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  cursor: initial;
`;

export const Container = styled.div`
  width: 90%;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 20vh;
  left: 5%;
  border-radius: 4px;
  cursor: initial;

  @media (min-width: 768px) {
    & {
      width: 30rem;
      left: calc((100% - 30rem) / 2);
    }
  }
`;

export const Header = styled.header`
  padding: 1rem;
  background-color: #7d40e7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.h3`
  color: #fff;
  font-size: 18px;
  width: 100%;
  text-align: left;
`;

export const Content = styled.section`
  padding: 2rem 0;
  margin: 0 20px;
  color: #111;
`;

export const ActionSection = styled.section`
  display: flex;
  justify-content: flex-end;
  margin: 0 20px;
  padding: 10px 0;

  border-top: 1px solid #ddd;

  button + button {
    margin-left: 20px;
  }
`;

export const CancelButton = styled.button`
  padding: 10px;
  width: 112px;
  border: none;
  text-transform: uppercase;
  background-color: #de3b3b;
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

export const ConfirmButton = styled.button`
  padding: 10px;
  width: 112px;
  border: none;
  text-transform: uppercase;
  background-color: #7d40e7;
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
