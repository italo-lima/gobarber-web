import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Types as UserTypes,
  ActionCreators as UserActions,
} from '~/store/ducks/user';

/**
 *
 * @param {Object} payload Data from the form to update the user profile
 */
function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;
    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    console.tron.log(profile);

    const response = yield call(api.put, '/users', profile);

    yield put(UserActions.updateProfileSuccess(response.data));
    toast.success('Perfil atualizado com sucesso!');
  } catch (error) {
    toast.error('Erro ao atualizar perfil. Por favor, verifique seus dados');
    console.tron.log(error);
    yield put(UserActions.updateProfileError());
  }
}

export default all([
  takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, updateProfile),
]);
