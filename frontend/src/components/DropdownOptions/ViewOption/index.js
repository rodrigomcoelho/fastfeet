import React, { useState } from 'react';
import { IoMdEye } from 'react-icons/io';
import PropTypes from 'prop-types';

import ModaView from '../ModalView';
import { Button } from './styles';

export default function ViewOption({ content }) {
  const [showing, setShowing] = useState(false);

  function handlwShoingModal() {
    setShowing(!showing);
  }

  return (
    <>
      <li>
        <section>
          <Button type="button" onClick={handlwShoingModal}>
            <IoMdEye size={18} color="#8E5BE8" />
            Visualizar
          </Button>
        </section>
      </li>
      {showing && (
        <ModaView
          isOpen={showing}
          onRequestClose={handlwShoingModal}
          content={content}
        />
      )}
    </>
  );
}

ViewOption.propTypes = {
  content: PropTypes.shape().isRequired,
};
