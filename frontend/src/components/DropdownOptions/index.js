import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Container } from './styles';

import EditOption from './EditOption';
import DeleteOption from './DeleteOption';
import ViewOption from './ViewOption';

function DropdownOptions({
  urlEdit,
  onDelete,
  content,
  confirmSentence,
  confirmTitle,
  canCancel,
  canConfirm,
  deleteLabel,
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <Container>
      <span
        role="button"
        onMouseDown={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        tabIndex={0}
      >
        <FaEllipsisH />
        {showOptions && (
          <ul>
            {content && <ViewOption content={content} />}
            {urlEdit && <EditOption to={urlEdit} />}
            {canCancel && (
              <DeleteOption
                onDelete={onDelete}
                confirmTitle={confirmTitle}
                confirmSentence={confirmSentence}
                canCancel={canCancel}
                canConfirm={canConfirm}
                deleteLabel={deleteLabel}
              />
            )}
          </ul>
        )}
      </span>
    </Container>
  );
}

DropdownOptions.propTypes = {
  urlEdit: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  content: PropTypes.shape(),
  confirmSentence: PropTypes.string,
  confirmTitle: PropTypes.string,
  canCancel: PropTypes.bool,
  canConfirm: PropTypes.bool,
  deleteLabel: PropTypes.string,
};

DropdownOptions.defaultProps = {
  urlEdit: null,
  content: null,
  confirmSentence: 'Você tem certeza?',
  confirmTitle: 'Confirmar',
  canCancel: true,
  canConfirm: false,
  deleteLabel: null,
};

export default DropdownOptions;
