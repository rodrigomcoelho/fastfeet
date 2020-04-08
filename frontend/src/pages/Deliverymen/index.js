import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api, { CancelToken, isCancel } from '~/services/api';

import { Container } from '~/styles/_shared/defaultContainer';
import SearchRecord from '~/components/SearchRecord';
import { Table, Thead, Tbody } from '~/styles/_shared/Table/defaultTable';
import SmallPicture from '~/components/SmallPicture';
import DropdownOptions from '~/components/DropdownOptions';
import PaginationFooter from '~/components/PaginationFooter';

const limit = 5;
let cancel;

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchFor, setSearchFor] = useState('');

  useEffect(() => {
    if (cancel) cancel();
    async function fetchData() {
      try {
        const { data } = await api.get('/deliverymen', {
          params: { q: searchFor, limit, page: pageNumber },
          cancelToken: new CancelToken(c => {
            cancel = c;
          }),
        });
        if (data) setDeliverymen(data);
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
    if (!deliverymen || deliverymen.length < limit) return;

    setPageNumber(pageNumber + 1);
  };

  const handleGoBack = async () => {
    if (pageNumber <= 1) return;

    setPageNumber(pageNumber - 1);
  };

  const handleModalConfirm = id => {
    async function destroyRow() {
      await api.delete(`/deliverymen/${id}`);

      setDeliverymen(deliverymen.filter(del => del.id !== id));

      toast.success('Entregador removido com sucesso');
    }
    destroyRow();
  };

  return (
    <Container>
      <h1>Gerenciando entregadores</h1>
      <SearchRecord
        to="/deliverymen/register"
        name="deliveryman"
        placeHolder="Busca por entregadores"
        onChange={handleSearch}
      />
      <Table>
        <Thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </Thead>
        <Tbody>
          {deliverymen.map(deliveryman => (
            <tr key={deliveryman.id}>
              <td>#{deliveryman.id}</td>
              <td>
                <SmallPicture
                  avatar={deliveryman.avatar}
                  name={deliveryman.name}
                />
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <DropdownOptions
                  urlEdit={`/deliverymen/${deliveryman.id}/edit`}
                  onDelete={() => handleModalConfirm(deliveryman.id)}
                  confirmTitle="Remover entregador"
                  confirmSentence="Você tem certeza que deseja remover esse entregador?"
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
        lengthData={deliverymen.length}
        defaultLength={limit}
        pageNumber={pageNumber}
      />
    </Container>
  );
}
