/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const {
    fieldName,
    registerField,
    defaultValue = '',
    error = null,
  } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}
