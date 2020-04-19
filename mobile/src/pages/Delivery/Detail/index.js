import React, { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import { StatusBar, TouchableOpacity, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '~/services/api';

import {
  Container,
  BackgroundHeader,
  Block,
  Title,
  TitleDescription,
  FieldName,
  FieldValue,
  Double,
  ButtonSection,
  Button,
  Text,
  // LoadingCountainer,
  // Loading,
} from './styles';

export default function Detail({ navigation, route }) {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Delivery')}>
        <Icon name="chevron-left" size={32} color="#fff" />
      </TouchableOpacity>
    ),
  });

  const { user } = useSelector((state) => state.auth);

  const { deliveryId } = route.params;
  const [delivery, setDelivery] = useState({});

  useFocusEffect(
    useCallback(() => {
      async function fetchDate() {
        const { data } = await api.get(`/deliveries/${deliveryId}`);
        if (data) setDelivery(data);
      }

      fetchDate();
    }, [deliveryId]),
  );

  const dateStarted = useMemo(
    () =>
      delivery.start_date
        ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
        : '--/--/--',
    [delivery.start_date],
  );

  const dateEnded = useMemo(
    () =>
      delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : '--/--/--',
    [delivery.end_date],
  );

  const status = useMemo(() => {
    const statusArr = {
      pending: 'Aguardando retirada',
      ongoing: 'Pendente',
      complete: 'Entregue',
    };

    return statusArr[delivery.status];
  }, [delivery.status]);

  async function startDelivery() {
    try {
      const {
        data: { start_date },
      } = await api.put(
        `/deliveries/${deliveryId}/deliveries/${user.id}/withdraw`,
        {
          start_date: new Date(),
        },
      );
      setDelivery({ ...delivery, start_date });
    } catch (error) {
      const { response } = error;
      console.tron.log(error.response);
      const { data } = response;
      Alert.alert(data.error);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      {/* {delivery.recipient ? ( */}
      <Container>
        <BackgroundHeader />
        <Block up>
          <Title>
            <Icon name="truck" size={20} color="#7D40E7" />
            <TitleDescription>Informações da entrega</TitleDescription>
          </Title>

          <FieldName first>Destinatário</FieldName>
          <FieldValue>
            {delivery.recipient && delivery.recipient.name}
          </FieldValue>

          <FieldName>Endereço de Entrega</FieldName>
          <FieldValue>
            {delivery.recipient &&
              `${delivery.recipient.street}, ${delivery.recipient.number},  ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zipcode}`}
          </FieldValue>

          <FieldName>Produto</FieldName>
          <FieldValue>{delivery.product}</FieldValue>
        </Block>
        <Block>
          <Title>
            <Icon name="calendar" size={18} color="#7D40E7" />
            <TitleDescription>Situação da entrega</TitleDescription>
          </Title>

          <FieldName>Status</FieldName>
          <FieldValue>{status}</FieldValue>

          <Double>
            <View>
              <FieldName>Data de Retirada</FieldName>
              <FieldValue>{dateStarted}</FieldValue>
            </View>

            <View>
              <FieldName>Data de Entrega</FieldName>
              <FieldValue>{dateEnded}</FieldValue>
            </View>
          </Double>
        </Block>

        <ButtonSection>
          {delivery.start_date ? (
            <>
              <Button
                onPress={() => {
                  if (!delivery.end_date)
                    navigation.navigate('ReportProblem', { deliveryId });
                  else
                    Alert.alert(
                      'Entrega finalizada',
                      'Não se preocupe a entrega já esta finalizada =D',
                    );
                }}>
                <Icon name="close-circle-outline" size={20} color="#E74040" />
                <Text>Informar Problema</Text>
              </Button>
              <Button
                middle
                onPress={() =>
                  navigation.navigate('DeliViewProblemvery', { deliveryId })
                }>
                <Icon name="alert-circle-outline" size={20} color="#E7BA40" />
                <Text>Visualizar Problema</Text>
              </Button>
              <Button
                onPress={() => {
                  if (!delivery.end_date)
                    navigation.navigate('ConfirmDelivery', { deliveryId });
                  else
                    Alert.alert(
                      'Entrega finalizada',
                      'Não se preocupe a entrega já esta finalizada =D',
                    );
                }}>
                <Icon name="check-circle-outline" size={20} color="#7D40E7" />
                <Text>Confirmar Entrega</Text>
              </Button>
            </>
          ) : (
            <Button onPress={startDelivery}>
              <Icon name="truck-delivery" size={20} color="#7D40E7" />
              <Text>Iniciar Entregar</Text>
            </Button>
          )}
        </ButtonSection>
      </Container>
      {/* ) : (
        <LoadingCountainer><Loading /></LoadingCountainer>
      )} */}
    </>
  );
}

Detail.propTypes = {
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
