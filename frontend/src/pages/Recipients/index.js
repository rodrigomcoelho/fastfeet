import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api, { CancelToken, isCancel } from '~/services/api';

import { Container } from '~/styles/_shared/defaultContainer';
import { Table, Thead, Tbody } from '~/styles/_shared/Table/defaultTable';

import PaginationFooter from '~/components/PaginationFooter';
import SearchRecord from '~/components/SearchRecord';
import DropdownOptions from '~/components/DropdownOptions';

const limit = 5;
let cancel;

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchFor, setSearchFor] = useState('');

  useEffect(() => {
    if (cancel) cancel();
    async function fetchData() {
      try {
        const { data } = await api.get('/recipients', {
          params: { q: searchFor, limit, page: pageNumber },
          cancelToken: new CancelToken(c => {
            cancel = c;
          }),
        });
        if (data) setRecipients(data);
      } catch (error) {
        if (isCancel(error)) console.tron.log('Operação cancelada');
      }
    }

    fetchData();
  }, [pageNumber, searchFor]);

  async function handleSearch(e) {
    setSearchFor(e.target.value);
  }

  const handleGoNext = async () => {
    if (!recipients || recipients.length < limit) return;

    setPageNumber(pageNumber + 1);
  };

  const handleGoBack = async () => {
    if (pageNumber <= 1) return;

    setPageNumber(pageNumber - 1);
  };

  const handleModalConfirm = id => {
    async function destroyRow() {
      await api.delete(`/recipients/${id}`);

      setRecipients(recipients.filter(del => del.id !== id));

      toast.success('Destinatário removido com sucesso');
    }
    destroyRow();
  };

  return (
    <Container>
      <h1>Gerenciando destinatários</h1>
      <SearchRecord
        name="recipient"
        onChange={handleSearch}
        placeHolder="Buscar por destinatário"
        to="/recipients/register"
      />
      <Table>
        <Thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </Thead>
        <Tbody>
          {recipients.map(recipient => (
            <tr key={recipient.id}>
              <td>#{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>{recipient.fullAddress}</td>
              <td>
                <DropdownOptions
                  urlEdit={`/recipients/${recipient.id}/edit`}
                  onDelete={() => handleModalConfirm(recipient.id)}
                  confirmTitle="Remover destinatário"
                  confirmSentence="Você tem certeza que deseja remover esse destinatário?"
                  canConfirm
                  canCancel
                />
              </td>
            </tr>
          ))}
        </Tbody>
      </Table>
      <PaginationFooter
        goNext={handleGoNext}
        goBack={handleGoBack}
        lengthData={recipients.length}
        defaultLength={limit}
        pageNumber={pageNumber}
      />
    </Container>
  );
}
