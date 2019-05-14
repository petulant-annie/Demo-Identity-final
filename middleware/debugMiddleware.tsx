import { Dispatch, Action } from 'redux';

const debugMiddleware = () => (next: Dispatch) => (action: Action) => {
  console.log('Logged action', action);
  next(action);
};

export default debugMiddleware;
