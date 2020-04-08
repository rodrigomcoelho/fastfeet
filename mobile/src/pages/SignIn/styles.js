import styled from 'styled-components/native';
import OriginalButton from '~/components/Button';
import LogoSVG from '~/assets/fast-feet.svg';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #7d40e7;
  padding: 0 25px;

  justify-content: center;
`;

export const Logo = styled(LogoSVG).attrs({
  width: 244,
  height: 48,
})`
  align-self: center;
  margin-bottom: 37px;
`;

export const Button = styled(OriginalButton)`
  background-color: #82bf18;
  margin-top: 16px;
`;
