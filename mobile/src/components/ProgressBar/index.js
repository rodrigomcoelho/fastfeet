import React from 'react';
import PropTypes from 'prop-types';

import { Container, Step, Cicle, Subtitle, Line } from './styles';

const filledOut = {
  pending: 0,
  ongoing: 1,
  complete: 2,
};

const stepStatus = ['Aguardando Retirada', 'Retirada', 'Entregue'];

export default function ProgressBar({ status }) {
  return (
    <Container>
      <Line />
      {stepStatus.map((step, index) => (
        <Step key={step}>
          <Cicle complete={filledOut[status] >= index} />
          <Subtitle>{step}</Subtitle>
        </Step>
      ))}
    </Container>
  );
}

ProgressBar.propTypes = {
  status: PropTypes.string.isRequired,
};
