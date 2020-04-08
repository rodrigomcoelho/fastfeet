import React from 'react';
import { MdDone } from 'react-icons/md';

import { Button } from './styles';

export default function SubmitButton() {
  return (
    <Button type="submit">
      <MdDone />
      Salvar
    </Button>
  );
}
