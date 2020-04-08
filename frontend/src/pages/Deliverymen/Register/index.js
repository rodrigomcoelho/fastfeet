import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { FormContainer } from '~/styles/_shared/defaultContainer';
import { Content } from '~/styles/_shared/Form/defaultForm';

import { ButtonSection } from './styles';
import BackButton from '~/components/BackButton';
import SubmitButton from '~/components/SubmitButton';
import AvatarInput from '~/components/AvatarInput';
import Input from '~/components/Input';

export default function Register() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors([]);
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

      await api.post('/deliverymen', data);
      toast.success('Entregador cadastrado com sucesso');
      reset();
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
      <h1>Cadastrando entregador</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Content>
          <ButtonSection>
            <BackButton to="/deliverymen" />
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
        </Content>
      </Form>
    </FormContainer>
  );
}
