import React, { useState, useRef } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';

import api from '~/services/api';

import {
  Container,
  BackgroundHeader,
  CameraContainer,
  Button,
  Camera,
  PreviewImage,
  TakePicture,
} from './styles';

export default function Confirm({ navigation, route }) {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={32} color="#fff" />
      </TouchableOpacity>
    ),
  });

  const { deliveryId } = route.params;

  const cameraRef = useRef(null);
  const [delivery, setDelivery] = useState({});

  const user = useSelector((state) => state.auth.user);

  const takePicture = async () => {
    if (delivery.uri) {
      setDelivery({});
      return;
    }

    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
      };
      const data = await cameraRef.current.takePictureAsync(options);
      setDelivery({
        uri: data.uri,
        type: 'image/jpeg',
        name: `${Number(new Date()).toString(36)}_${user.id}.jpg`,
      });
    }
  };

  const completeDelivery = async () => {
    if (!delivery.uri) return;
    const dataForm = new FormData();
    dataForm.append('file', delivery);
    await api.put(`/deliveries/${deliveryId}/complete`, dataForm);
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <BackgroundHeader />
        <CameraContainer>
          {delivery.uri ? (
            <PreviewImage source={{ uri: delivery.uri }} />
          ) : (
            <Camera
              ref={cameraRef}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.auto}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar a camera',
                message: 'Nós precisamos de sua permissão para usar a camera',
                buttonPositive: 'Permitir',
                buttonNegative: 'Não permitir',
              }}
            />
          )}

          <TakePicture onPress={takePicture}>
            <Icon
              name={delivery.uri ? 'delete' : 'camera-alt'}
              size={32}
              color="#fff"
            />
          </TakePicture>
        </CameraContainer>
        <Button onPress={() => completeDelivery()}>Enviar</Button>
      </Container>
    </>
  );
}

Confirm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
