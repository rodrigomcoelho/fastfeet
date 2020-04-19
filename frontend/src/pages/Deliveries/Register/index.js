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
import Select from '~/components/SelectAsync';

export default function Register() {
  const formRef = useRef(null);
  const getRecipients = async inputValue => {
    const { data } = await api.get('/recipients', {
      params: { all: true, order: 'name', q: inputValue },
    });

    return data.map(to => ({ value: to.id, label: to.name }));
  };

  const getDeliverymen = async inputValue => {
    const { data } = await api.get('/deliverymen', {
      params: { all: true, order: 'name', q: inputValue },
    });
    return data.map(man => ({ value: man.id, label: man.name }));
  };

  async function handleSumit(data, { reset }) {
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
      await api.post('/deliveries', data);
      toast.success('Encomenda cadastrada com sucesso');
      reset();
    } catch (errors) {
      toast.error('Ops... algo deu errado');
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
      <h1>Cadastro de encomenda</h1>
      <Form ref={formRef} onSubmit={handleSumit}>
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
              placeholder="Selecione um destinatário"
            />

            <Select
              name="deliveryman_id"
              label="Entregador"
              loadOptions={getDeliverymen}
              placeholder="Selecione um destinatário"
            />
          </View>
          <Input
            name="product"
            placeholder="Yamaha SX7"
            label="Nome do produto"
          />
        </Content>
      </Form>
    </FormContainer>
  );
}
