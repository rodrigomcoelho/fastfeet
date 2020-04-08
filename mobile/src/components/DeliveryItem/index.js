import React, { useMemo } from 'react';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import ProgressBar from '../ProgressBar';

import {
  Container,
  Status,
  DeliveryTitle,
  DeliveryNumber,
  Details,
  DetailsContent,
  DatailsDate,
  DetailsInfo,
  DetailsView,
} from './styles';

export default function DeliveryItem({ data, onClick }) {
  const startDate = useMemo(
    () => format(parseISO(data.createdAt), 'dd/MM/yyyy', { locale: ptBR }),
    [data.createdAt],
  );

  return (
    <Container>
      <Status>
        <DeliveryTitle>
          <Icon name="local-shipping" size={22} color="#7D40E7" />
          <DeliveryNumber>Encomenda {data.id}</DeliveryNumber>
        </DeliveryTitle>
        <ProgressBar status={data.status} />
      </Status>

      <Details>
        <DetailsContent>
          <View>
            <DatailsDate>Data</DatailsDate>
            <DetailsInfo>{startDate}</DetailsInfo>
          </View>

          <View>
            <DatailsDate>Cidade</DatailsDate>
            <DetailsInfo>{data.recipient.city}</DetailsInfo>
          </View>

          <TouchableOpacity onPress={onClick}>
            <DetailsView>Ver detalhes</DetailsView>
          </TouchableOpacity>
        </DetailsContent>
      </Details>
    </Container>
  );
}

DeliveryItem.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
