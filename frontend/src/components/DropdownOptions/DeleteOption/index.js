import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';

import { ButtonDelete } from './styles';

import ConfirmDelete from '~/components/ConfirmDelete';

export default function DeleteOption({
  onDelete,
  confirmSentence,
  confirmTitle,
  canCancel,
  canConfirm,
  deleteLabel,
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <li>
        <section>
          <ButtonDelete
            type="button"
            onClick={() => setShow(true)}
            increaseWith={!deleteLabel}
          >
            <MdDeleteForever size={18} color="#DE3B3B" />
            {deleteLabel || 'Excluir'}
          </ButtonDelete>
        </section>
      </li>

      {show && (
        <ConfirmDelete
          title={confirmTitle}
          canCancel={canCancel}
          onCancel={() => setShow(false)}
          canConfirm={canConfirm}
          onConfirm={onDelete}
        >
          {confirmSentence}
        </ConfirmDelete>
      )}
    </>
  );
}

DeleteOption.propTypes = {
  onDelete: PropTypes.func.isRequired,
  confirmSentence: PropTypes.string,
  confirmTitle: PropTypes.string,
  canCancel: PropTypes.bool,
  canConfirm: PropTypes.bool,
  deleteLabel: PropTypes.string,
};

DeleteOption.defaultProps = {
  confirmSentence: 'Você tem certeza?',
  confirmTitle: 'Confirmar',
  canCancel: true,
  canConfirm: false,
  deleteLabel: null,
};
