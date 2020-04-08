import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Title,
  Content,
  ActionSection,
  CancelButton,
  ConfirmButton,
  Backdrop,
} from './styles';

function ConfirmDelete({
  title,
  children,
  canCancel,
  canConfirm,
  onCancel,
  onConfirm,
}) {
  return (
    <>
      <Backdrop />
      <Container>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Content>{children}</Content>
        <ActionSection>
          {canConfirm && (
            <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
          )}
          {canCancel && (
            <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          )}
        </ActionSection>
      </Container>
    </>
  );
}

ConfirmDelete.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  canCancel: PropTypes.bool,
  canConfirm: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

ConfirmDelete.defaultProps = {
  canCancel: true,
  canConfirm: false,
  onCancel: () => {},
  onConfirm: () => {},
};

export default ConfirmDelete;
