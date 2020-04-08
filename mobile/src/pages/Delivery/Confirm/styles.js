import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import OriginalButton from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const BackgroundHeader = styled.View`
  width: 100%;
  height: 90px;
  background-color: #7d40e7;
`;

export const CameraContainer = styled.View`
  background-color: #000;
  margin-top: -70px;
  margin-right: 20px;
  margin-left: 20px;
  position: relative;

  flex: 1;
  flex-direction: column;
`;

export const Button = styled(OriginalButton)`
  margin: 12px 20px;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
`;

export const PreviewImage = styled.Image`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
`;

export const TakePicture = styled.TouchableOpacity`
  position: absolute;
  align-self: center;
  bottom: 20px;
  z-index: 1;
  padding: 15px;
  border-radius: 32px;
  background-color: rgba(255, 255, 255, 0.3);
`;
