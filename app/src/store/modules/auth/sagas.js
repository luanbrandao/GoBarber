import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços'
      );
      return;
    }

    // seta o token em todas as requisições
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // yield delay(3000);
    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    console.tron.log('error => ', error);
    Alert.alert(
      'Falha na autenticação',
      // 'Houve um erro no login, verifique seus dados'
      error.response.data.error ||
        'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    // history.push('/');
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      error.response.data.error ||
        'Houve um erro no cadastro, verifique seus dados'
    );
    yield put(signFailure());
  }
}

// pega o token do storage do persist
export function setToken({ payload }) {
  if (!payload) return;
  console.tron.log('setToken => ', payload);
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  // persist/REHYDRATE, executa toda vez quando inicia a aplicação
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
