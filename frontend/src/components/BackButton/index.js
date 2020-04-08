import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import PropTypes from 'prop-types';

import { LinkBack } from './styles';

function BackButton({ to }) {
  return (
    <LinkBack to={to}>
      <IoIosArrowBack /> Voltar
    </LinkBack>
  );
}

BackButton.propTypes = {
  to: PropTypes.string.isRequired,
};

export default BackButton;
