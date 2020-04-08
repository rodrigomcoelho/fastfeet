import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Content, Block, Title, Text, Signature } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function ModalView({ content, isOpen, onRequestClose }) {
  ReactModal.setAppElement('#root');
  const delivery = {
    ...content,
    start_date:
      content.start_date &&
      format(parseISO(content.start_date), 'dd/MM/yyyy', { locale: ptBR }),
    end_date:
      content.end_date &&
      format(parseISO(content.end_date), 'dd/MM/yyyy', { locale: ptBR }),
  };

  const { problem } = delivery;

  return (
    <>
      {delivery && (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={customStyles}
        >
          <Content>
            {problem ? (
              <>
                <Block>
                  <Title upperCase>Visualizar Problema</Title>
                  <Text>{problem}</Text>
                </Block>
              </>
            ) : (
              <>
                <Block>
                  <Title>Informações da encomenda</Title>
                  <Text>
                    {delivery.recipient &&
                      `${delivery.recipient.street}, ${delivery.recipient.number}`}
                  </Text>
                  <Text>
                    {delivery.recipient &&
                      `${delivery.recipient.city} - ${delivery.recipient.state}`}
                  </Text>
                  <Text>
                    {delivery.recipient && delivery.recipient.zipcode}
                  </Text>
                </Block>
                <Block>
                  <Title>Datas</Title>
                  <Text>
                    <strong>Retirada:</strong> {delivery.start_date}
                  </Text>
                  <Text>
                    <strong>Entrega:</strong> {delivery.end_date}
                  </Text>
                </Block>
                <Block>
                  <Title>Assinatura do destinatário</Title>
                  {delivery.signature && (
                    <Signature src={delivery.signature.url} />
                  )}
                </Block>
              </>
            )}
          </Content>
        </ReactModal>
      )}
    </>
  );
}

ModalView.propTypes = {
  content: PropTypes.shape().isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
};

ModalView.defaultProps = {
  onRequestClose: () => {},
};
