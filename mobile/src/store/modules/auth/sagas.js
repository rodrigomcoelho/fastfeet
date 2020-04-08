import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const { data: user } = yield call(api.get, `deliverymen/${id}`);

    if (!user) throw new Error('Usuário não encontrado');

    yield put(signInSuccess(user));
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      `Falha na autenticação. Verifique seus dados. ${error}`,
    );
    yield put(signFailure());
  }
}

export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
