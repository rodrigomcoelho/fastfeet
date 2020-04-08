import React from 'react';
import PropTypes from 'prop-types';

import { Container, Button } from './styles';

export default function PaginationFooter({
  goBack,
  goNext,
  pageNumber,
  lengthData,
  defaultLength,
}) {
  return (
    <Container>
      <Button type="button" onClick={goBack} disabled={pageNumber <= 1}>
        Anterior
      </Button>
      <span>{pageNumber}</span>
      <Button
        type="button"
        disabled={lengthData < defaultLength}
        onClick={goNext}
      >
        Próxima
      </Button>
    </Container>
  );
}

PaginationFooter.propTypes = {
  goBack: PropTypes.func.isRequired,
  goNext: PropTypes.func.isRequired,
  pageNumber: PropTypes.number,
  lengthData: PropTypes.number,
  defaultLength: PropTypes.number,
};

PaginationFooter.defaultProps = {
  pageNumber: 1,
  lengthData: 0,
  defaultLength: 1,
};
