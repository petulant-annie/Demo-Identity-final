import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import demoState from './reducers/demoReducers';
import debugMiddleware from './middleware/debugMiddleware';
import watchRequest from './sagas/sagaRequest';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    demoState,
  }),
  {},
  applyMiddleware(
    debugMiddleware,
    sagaMiddleware,
  ),
);

sagaMiddleware.run(watchRequest);

export default store;
