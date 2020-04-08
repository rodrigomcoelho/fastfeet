import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '../_layouts/auth/styles';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '../../assets/images/fastfeet-logo.png';

import Input from '~/components/Input';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Inserá um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('Senha é obrigatoria'),
});

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit({ email, password }) {
    try {
      formRef.current.setErrors([]);

      await schema.validate({ email, password }, { abortEarly: false });

      dispatch(signInRequest(email, password));
    } catch (errors) {
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
    <>
      <img src={logo} alt="FastFeet" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label htmlFor="email">Seu Email</Label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <Label htmlFor="password">Sua Senha</Label>
        <Input name="password" type="password" placeholder="*******" />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
