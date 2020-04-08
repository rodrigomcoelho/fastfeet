import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api, { CancelToken, isCancel } from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';

import DeliveryItem from '~/components/DeliveryItem';

import {
  Container,
  Header,
  Avatar,
  UserInfo,
  Welcome,
  UserName,
  ActionContainer,
  DeliveryText,
  ActionOption,
  ContentList,
  Loading,
} from './styles';

let cancel;

export default function Delivery({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [deliveries, setDeliveries] = useState([]);
  const [pendingSelected, setPendingSelected] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shouldRun, setShouldRun] = useState(true);

  const fetchData = useCallback(
    async (pageNumber = 1, isComplete = true, arrDeliveries = []) => {
      setLoading(true);
      if (cancel) cancel();
      try {
        const { data } = await api.get(`/deliverymen/${user.id}/deliveries`, {
          params: {
            finished: !isComplete,
            page: pageNumber,
            limit: 20,
          },
          cancelToken: new CancelToken((c) => {
            cancel = c;
          }),
        });
        setDeliveries([...arrDeliveries, ...data]);
        if (data.length > 0) setPage(pageNumber + 1);
        setLoading(false);
      } catch (error) {
        if (isCancel(error)) console.tron.log('Operação cancelada');
      }
    },
    [user.id],
  );

  useFocusEffect(
    useCallback(() => {
      fetchData();
      setPendingSelected(true);
    }, [fetchData]),
  );

  async function handleStatus(bool) {
    fetchData(1, bool);
    setPendingSelected(bool);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <Header>
          <Avatar
            source={{
              uri: user.avatar
                ? user.avatar.url
                : `http://api.adorable.io/avatar/50/${user.name}.png`,
            }}
          />
          <UserInfo>
            <Welcome>Bem vindo de volta,</Welcome>
            <UserName>{user.name}</UserName>
          </UserInfo>
          <TouchableOpacity onPress={() => dispatch(signOut())}>
            <Icon name="exit-to-app" size={18} color="#E74040" />
          </TouchableOpacity>
        </Header>

        <ActionContainer>
          <DeliveryText>Entregas</DeliveryText>

          <TouchableOpacity onPress={() => handleStatus(true)}>
            <ActionOption show={pendingSelected}>Pendentes</ActionOption>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleStatus(false)}>
            <ActionOption show={!pendingSelected}>Entregues</ActionOption>
          </TouchableOpacity>
        </ActionContainer>

        <ContentList
          data={deliveries}
          keyExtractor={(item) => String(item.id)}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <DeliveryItem
              data={item}
              onClick={() =>
                navigation.navigate('DeliveryDetail', {
                  deliveryId: item.id,
                })
              }
            />
          )}
          initialNumToRender={20}
          onEndReached={() => {
            if (!shouldRun) {
              fetchData(page + 1, pendingSelected, deliveries);
              setShouldRun(true);
            }
          }}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => setShouldRun(false)}
        />
      </Container>
    </>
  );
}

Delivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
