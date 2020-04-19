import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';

import { FormContainer } from '~/styles/_shared/defaultContainer';
import { Content, View } from '~/styles/_shared/Form/defaultForm';
import { ButtonSection } from './styles';
import BackButton from '~/components/BackButton';
import SubmitButton from '~/components/SubmitButton';
import Select from '~/components/SelectAsync';
import Input from '~/components/Input';

export default function Edit({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    async function getDelivery() {
      const { data } = await api.get(`/deliveries/${id}`);
      formRef.current.setData(data);

      if (data.deliveryman)
      formRef.current.setFieldValue('deliveryman_id', {
        value: data.deliveryman.id,
        label: data.deliveryman.name,
      });

      if (data.recipient)
      formRef.current.setFieldValue('recipient_id', {
        value: data.recipient.id,
        label: data.recipient.name,
      });
    }

    getDelivery();
  }, [id]);

  const getDeliveries = async inputValue => {
    const { data } = await api.get('/deliverymen', {
      params: { all: true, q: inputValue, order: 'name id' },
    });

    return data.map(man => ({ value: man.id, label: man.name }));
  };

  const getRecipients = async inputValue => {
    const { data } = await api.get('/recipients', {
      params: { all: true, q: inputValue, order: 'name id' },
    });
    return data.map(to => ({ value: to.id, label: to.name }));
  };

  const handleSubmit = async data => {
    try {
      formRef.current.setErrors([]);
      const schema = Yup.object().shape({
        product: Yup.string().required('Produto é obrigatório'),
        recipient_id: Yup.number()
          .typeError('Destinatário é obrigado')
          .integer()
          .positive()
          .required('Destinatário obrigatório'),
        deliveryman_id: Yup.number()
          .integer()
          .positive()
          .required('Entregador obrigatório')
          .typeError('Entregador obrigatório'),
      });
      await schema.validate(data, { abortEarly: false });
      await api.put(`/deliveries/${id}`, data);
      toast.success('Encomenda alterada com sucesso');
    } catch (errors) {
      const validationErrors = {};
      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Editando encomenda</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ButtonSection>
          <BackButton to="/deliveries" />
          <SubmitButton />
        </ButtonSection>
        <Content>
          <View grid gridSizeColumn="1fr 1fr" columnGap={30}>
            <Select
              name="recipient_id"
              label="Destinatário"
              loadOptions={getRecipients}
            />
            <Select
              name="deliveryman_id"
              label="Entregador"
              loadOptions={getDeliveries}
            />
          </View>
          <Input name="product" label="Produto" placeholder="Yamaha YBR" />
        </Content>
      </Form>
    </FormContainer>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
