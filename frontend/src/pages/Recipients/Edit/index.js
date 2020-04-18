import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';
import { FormContainer } from '~/styles/_shared/defaultContainer';
import { Content, View } from '~/styles/_shared/Form/defaultForm';
import { ButtonSection } from './styles';
import BackButton from '~/components/BackButton';
import SubmitButton from '~/components/SubmitButton';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  street: Yup.string().required('Rua é obrigtório'),
  number: Yup.number()
    .typeError('Numero é obrigatório')
    .positive('Numero deve ser positivo')
    .integer('Deve ser um número'),
  address1: Yup.string(),
  city: Yup.string().required('Cidade é obrigatório'),
  state: Yup.string().required('Estado é obrigatório'),
  zipcode: Yup.string().required('CEP é obrigatório'),
});

function Edit({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    async function loadRecipient() {
      const { data } = await api.get(`/recipients/${id}`);
      formRef.current.setData(data);
    }

    loadRecipient();
  }, [id]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors([]);
      await schema.validate(data, { abortEarly: false });
      await api.put(`/recipients/${id}`, data);
      toast.success('Destinatário atualizado com sucesso');
    } catch (errors) {
      toast.error('Ops.. algo deu errado');
      const validationErrors = {};
      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <FormContainer>
      <h1>Cadastro de desitinários</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <ButtonSection>
          <BackButton to="/recipients" />
          <SubmitButton />
        </ButtonSection>
        <Content>
          <Input
            type="text"
            name="name"
            placeholder="Ludwig van Beethoven"
            label="Nome"
          />

          <View grid gridSizeColumn="3fr 1fr 1fr" columnGap={13}>
            <Input
              type="text"
              name="street"
              placeholder="Rua Beethoven"
              label="Rua"
            />

            <Input
              type="number"
              name="number"
              placeholder="1729"
              label="Numero"
            />

            <Input type="text" name="address1" label="Complemento" />
          </View>

          <View grid gridSizeColumn="1fr 1fr 1fr" columnGap={13}>
            <Input
              type="text"
              name="city"
              placeholder="Canarana"
              label="Cidade"
            />

            <Input
              type="text"
              name="state"
              placeholder="MT"
              label="Estado"
            />

            <InputMask
              type="text"
              name="zipcode"
              mask="99999-999"
              placeholder="78640-000"
              label="CEP"
            />
          </View>
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

export default Edit;
