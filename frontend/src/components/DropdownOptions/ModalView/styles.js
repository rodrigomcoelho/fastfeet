import styled from 'styled-components';

export const Content = styled.div`
  padding: 25px;
  width: 450px;
`;

export const Block = styled.div`
  padding-bottom: 12px;

  & + & {
    border-top: 1px solid #eee;
    padding-top: 8px;
  }

  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  color: #444;
  font-weight: bold;
  line-height: 20px;
  ${props =>
    props.upperCase && 'text-transform: uppercase; margin-bottom: 16px;'}
`;

export const Text = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 26px;
`;

export const Signature = styled.img`
  min-width: 234px;
  max-width: 100%;
  min-height: 36px;
  max-height: 100px;
  object-fit: cover;
  margin: 20px auto;
`;
