import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { FormContainer } from '~/styles/_shared/defaultContainer';
import { Content, View } from '~/styles/_shared/Form/defaultForm';
import { ButtonSection } from './styles';
import BackButton from '~/components/BackButton';
import SubmitButton from '~/components/SubmitButton';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

export default function Register() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors([]);
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
      await schema.validate(data, { abortEarly: false });
      await api.post('/recipients', data);
      toast.success('Destinatário cadastrado com sucesso');
      reset();
    } catch (errors) {
      toast.error('Ops.. algo deu errado');
      toast.warn(errors);
      toast.warn(errors.message);
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
      <h1>Cadastro de destinatário</h1>
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
              // maskPlaceholder="99999-999"
              placeholder="78640-000"
              label="CEP"
            />
          </View>
        </Content>
      </Form>
    </FormContainer>
  );
}
