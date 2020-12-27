import createSagaMiddleare from 'redux-saga';
import { persistStore } from 'redux-persist';

import createStore from './createStore';
import rootReducer from './ducks';
import rootSaga from './sagas';

import persistReducers from './persistReducers';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleare({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
