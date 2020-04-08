import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api, { isCancel, CancelToken } from '~/services/api';

import { Container } from '~/styles/_shared/defaultContainer';
import { Table, Thead, Tbody } from '~/styles/_shared/Table/defaultTable';
import DropdownOptions from '~/components/DropdownOptions';
import PaginationFooter from '~/components/PaginationFooter';

import { ContainerCheck } from './styles';

let cancel;
const limit = 10;

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (cancel) cancel();

    async function fetchData() {
      try {
        const { data } = await api.get('/problems', {
          params: { limit, page: pageNumber, allActive: active },
          cancelToken: new CancelToken(c => {
            cancel = c;
          }),
        });
        if (data) setProblems(data);
      } catch (error) {
        if (isCancel(error)) console.tron.log('Operação cancelada');
      }
    }

    fetchData();
  }, [active, pageNumber]);

  const handleGoNext = async () => {
    if (!problems || problems.length < limit) return;

    setPageNumber(pageNumber + 1);
  };

  const handleGoBack = async () => {
    if (pageNumber <= 1) return;

    setPageNumber(pageNumber - 1);
  };

  const handleModalConfirm = async problem => {
    const {
      id,
      delivery: { id: deliveryId },
    } = problem;

    await api.put(`/problems/${id}/cancel-delivery`);

    setProblems(problems.filter(del => del.delivery.id !== deliveryId));

    toast.success('Entrega cancelada com sucesso');
  };

  return (
    <Container>
      <ContainerCheck>
        <h1>Problemas na entrega</h1>
        <input
          type="checkbox"
          id="check-active"
          checked={active}
          onChange={() => setActive(prev => !prev)}
        />
        <label htmlFor="check-active">Pendentes</label>
      </ContainerCheck>
      <Table>
        <Thead firstWith={230}>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </Thead>
        <Tbody>
          {problems.map(problem => (
            <tr key={problem.id}>
              <td>#{problem.delivery.id}</td>
              <td>
                <p>{problem.description}</p>
              </td>
              <td>
                <DropdownOptions
                  content={{ problem: problem.description }}
                  confirmTitle="Cancelar entrega"
                  confirmSentence="Você tem certeza que deseja cancelar essa entrega?"
                  canConfirm
                  canCancel={!problem.delivery.canceled_at}
                  deleteLabel="Cancelar entrega"
                  onDelete={() =>
                    problem.delivery.canceled_at
                      ? toast.warn('Essa entrega já foi cancelada')
                      : handleModalConfirm(problem)
                  }
                />
              </td>
            </tr>
          ))}
        </Tbody>
      </Table>
      <PaginationFooter
        goNext={handleGoNext}
        goBack={handleGoBack}
        lengthData={problems.length}
        defaultLength={limit}
        pageNumber={pageNumber}
      />
    </Container>
  );
}
