import React, { useState, useCallback } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  BackgroundHeader,
  WindowTitle,
  Block,
  Title,
  Date,
  ContentList,
} from './styles';

export default function ViewProblem({ navigation, route }) {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={32} color="#fff" />
      </TouchableOpacity>
    ),
  });

  const { deliveryId } = route.params;
  const [problems, setProblems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const { data } = await api.get(`/deliveries/${deliveryId}/problems`);
        if (data)
          setProblems(
            data.map((d) => ({
              ...d,
              date: format(parseISO(d.createdAt), 'dd/MM/yyyy'),
            })),
          );
      }

      if (deliveryId) fetchData();
    }, [deliveryId]),
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <BackgroundHeader />

        <WindowTitle>Encomenda {deliveryId}</WindowTitle>

        {problems.length > 0 && (
          <ContentList
            data={problems}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Block>
                <Title>{item.description}</Title>
                <Date>{item.date}</Date>
              </Block>
            )}
          />
        )}
      </Container>
    </>
  );
}

ViewProblem.propTypes = {
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
