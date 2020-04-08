import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import PropTypes from 'prop-types';

export default function EditOption({ to }) {
  return (
    <li>
      <section>
        <Link to={to}>
          <MdEdit size={18} color="#4D85EE" />
          Editar
        </Link>
      </section>
    </li>
  );
}

EditOption.propTypes = {
  to: PropTypes.string.isRequired,
};
