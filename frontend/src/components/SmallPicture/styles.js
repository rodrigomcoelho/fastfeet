import styled from 'styled-components';

export const Container = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Initials = styled.span`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #f4effc;

  color: #a28fd0;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;
