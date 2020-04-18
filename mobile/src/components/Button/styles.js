import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  border-radius: 4px;
  background-color: #7d40e7;

  align-items: center;
  justify-content: center;

  ${(props) =>
    !props.enabled &&
    css`
      opacity: 0.3;
    `}
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
