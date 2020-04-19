import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import api from '~/services/api';

import NoPreviewImage from './NoPreviewImage';
import { Container } from './styles';

const ImageInput = ({ name, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [fileInput, setFileInput] = useState(defaultValue && defaultValue.id);

  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback(async e => {
    const file = e.target.files?.[0];

    if (!file) return;

    const dataForm = new FormData();
    dataForm.append('file', file);

    const previewURL = URL.createObjectURL(file);

    const {
      data: { id },
    } = await api.post('files', dataForm);

    setFileInput(id);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'dataset.file',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        if (!value) return;
        const { id, url } = value;
        if (id) setFileInput(id);
        if (url) setPreview(url);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={fieldName}>
        {preview ? <img src={preview} alt="Avatar" /> : <NoPreviewImage />}
        <input
          type="file"
          ref={inputRef}
          id={fieldName}
          onChange={handlePreview}
          {...rest}
          data-file={fileInput}
        />
        {error && <span>{error}</span>}
      </label>
    </Container>
  );
};

ImageInput.propTypes = {
  name: PropTypes.string,
};

ImageInput.defaultProps = {
  name: 'avatar',
};

export default ImageInput;
