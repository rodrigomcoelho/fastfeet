import React from 'react';
import { MdImage } from 'react-icons/md';
import { NoPreviewContainer } from './styles';

export default function NoPreviewImage() {
  return (
    <NoPreviewContainer>
      <MdImage />
      <p>Adicionar foto</p>
    </NoPreviewContainer>
  );
}
