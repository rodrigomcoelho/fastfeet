import React from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

function SearchRecord({ placeHolder, to, name, onChange }) {
  return (
    <Container>
      <input
        type="text"
        name={name}
        placeholder={placeHolder}
        onChange={onChange}
      />
      <MdSearch />
      <Link to={to}>
        <MdAdd />
        Cadastrar
      </Link>
    </Container>
  );
}

SearchRecord.propTypes = {
  placeHolder: PropTypes.string,
  to: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

SearchRecord.defaultProps = {
  placeHolder: '',
  to: '/',
  name: 'unnamed',
  onChange: () => {},
};

export default SearchRecord;
