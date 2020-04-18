import React, { useState, useEffect } from 'react';
import { MdFiberManualRecord } from 'react-icons/md';
import { toast } from 'react-toastify';

import api, { CancelToken, isCancel } from '~/services/api';

import SearchRecord from '~/components/SearchRecord';
import SmallPicture from '~/components/SmallPicture';
import DropdownOptions from '~/components/DropdownOptions';
import { Container } from '~/styles/_shared/defaultContainer';
import { Table, Thead, Tbody } from '~/styles/_shared/Table/defaultTable';
import PaginationFooter from '~/components/PaginationFooter';

import { TableDataStatus, ContainerCheck } from './styles';

let cancel;

const limit = 5;

const statusKey = {
  complete: 'entregue',
  pending: 'pendente',
  ongoing: 'retirada',
  canceled: 'cancelado',
};

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchFor, setSearchFor] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (cancel) cancel();
    async function fetchData() {
      try {
        const { data } = await api.get('/deliveries', {
          params: { q: searchFor, limit, page: pageNumber, allActive: active },
          cancelToken: new CancelToken(c => {
            cancel = c;
          }),
        });
        if (data) setDeliveries(data);
      } catch (error) {
        if (isCancel(error)) console.tron.log('Operação cancelada');
      }
    }

    fetchData();
  }, [active, pageNumber, searchFor]);

  async function handleSearch(e) {
    setSearchFor(e.target.value);
  }

  const handleGoNext = async () => {
    if (!deliveries || deliveries.length < limit) return;

    setPageNumber(pageNumber + 1);
  };

  const handleGoBack = async () => {
    if (pageNumber <= 1) return;

    setPageNumber(pageNumber - 1);
  };

  const handleModalConfirm = id => {
    async function destroyRow() {
      await api.delete(`/deliveries/${id}`);

      setDeliveries(deliveries.filter(del => del.id !== id));

      toast.success('Encomenda removido com sucesso');
    }
    destroyRow();
  };

  return (
    <>
      <Container>
        <ContainerCheck>
          <h1>Gerenciando encomendas</h1>
          <input
            type="checkbox"
            id="check-active"
            checked={active}
            onChange={() => setActive(prev => !prev)}
          />
          <label htmlFor="check-active">Pendentes</label>
        </ContainerCheck>
        <SearchRecord
          to="/deliveries/register"
          placeHolder="Busca por encomendas"
          name="delivery"
          onChange={handleSearch}
        />
        <Table>
          <Thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </Thead>
          <Tbody>
            {deliveries.map(delivery => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{delivery.recipient && delivery.recipient.name}</td>
                <td>
                  <SmallPicture
                    avatar={delivery.deliveryman && delivery.deliveryman.avatar}
                    name={delivery.deliveryman && delivery.deliveryman.name}
                  />
                </td>
                <td>{delivery.recipient && delivery.recipient.city}</td>
                <td>{delivery.recipient && delivery.recipient.state}</td>
                <td>
                  <TableDataStatus status={delivery.status}>
                    <span>
                      <MdFiberManualRecord />
                      {statusKey[delivery.status]}
                    </span>
                  </TableDataStatus>
                </td>
                <td>
                  <DropdownOptions
                    content={delivery}
                    urlEdit={`deliveries/${delivery.id}/edit`}
                    onDelete={() => {
                      handleModalConfirm(delivery.id);
                    }}
                    confirmTitle="Remover encomenda"
                    confirmSentence="Você tem certeza que deseja remover essa encomenda?"
                    canConfirm
                    canCancel={!delivery.canceled_at && !delivery.end_date}
                  />
                </td>
              </tr>
            ))}
          </Tbody>
        </Table>
        <PaginationFooter
          goNext={handleGoNext}
          goBack={handleGoBack}
          lengthData={deliveries.length}
          defaultLength={limit}
          pageNumber={pageNumber}
        />
      </Container>
    </>
  );
}
