import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { FormContainer } from '~/styles/_shared/defaultContainer';
import { Content } from '~/styles/_shared/Form/defaultForm';

import { ButtonSection } from './styles';
import BackButton from '~/components/BackButton';
import SubmitButton from '~/components/SubmitButton';
import AvatarInput from '~/components/AvatarInput';
import Input from '~/components/Input';

export default function Edit({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(`/deliverymen/${id}`);
      if (!data) return;

      formRef.current.setData(data);
      formRef.current.setFieldValue('avatar_id', data.avatar);
    }
    fetchData();
  }, [id]);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('O email deve ser um e-mail válido')
          .required('O email é obrigatório'),
        avatar_id: Yup.number()
          .positive()
          .integer(),
      });

      await schema.validate(data, { abortEarly: false });
      await api.put(`/deliverymen/${id}`, data);

      toast.success('Entregador alterado com sucesso');
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
      <h1>Editando entregador</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Content>
          <ButtonSection>
            <BackButton to="/recipients" />
            <SubmitButton />
          </ButtonSection>
          <AvatarInput name="avatar_id" />
          <Input name="name" type="text" placeholder="John Doe" label="Nome" />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="example@rocketseat.com"
          />
          {/* <Input name="id" type="hidden" /> */}
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
