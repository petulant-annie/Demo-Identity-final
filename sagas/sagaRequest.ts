import { Action } from 'redux';
import { put, select, takeEvery } from 'redux-saga/effects';

import { errorAction, showPreloaderAction } from '../actions/demoActions';

export interface IState {
  checkboxes: string[] | null[];
  showPreloader: boolean;
  error: boolean;
  value: {};
  commentValue: string;
  showEmailField: boolean;
  emailValid: boolean;
}

const API_URL: string = 'https://api.identityfront.com/v0/';

export function* startRequestAsync(action: Action) {
  const state = yield select(store => store.demoState.get());

  yield put(showPreloaderAction(true));
  try {
    const ticket = yield getTicket();
    let request;
    if (state.showEmailField) {
      const data = yield createApplicant(ticket, state);
      request = yield handleRequest(ticket, state, data.id);
    } else {
      request = yield handleRequest(ticket, state);
    }
    window.location.href = request;

  } catch {
    yield put(errorAction(true));
    yield put(showPreloaderAction(false));
  }
}

export default function* () {
  yield takeEvery('SEND_REQUEST', startRequestAsync);
}

function* getTicket() {
  const res = yield fetch(`${API_URL}tickets`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw res;
  }
  const ticket = yield res.json();

  return ticket;
}

function* createApplicant(ticket: { ticket: string }, state: IState) {
  const res = yield fetch(`${API_URL}applicants`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Ticket ${ticket.ticket}`,
    },
    body: window.JSON.stringify(state.value),
  });
  if (!res.ok) {
    throw res;
  }
  const applicant = yield res.json();

  return applicant;
}

function* handleRequest(ticket: { ticket: string }, state: IState, id?: string) {
  const evidence = [];

  for (const type of state.checkboxes) {
    if (type != null) {
      evidence.push({ type });
    }
  }

  const res = yield fetch(`${API_URL}validations`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Ticket ${ticket.ticket}`,
    },
    body: window.JSON.stringify({
      evidence,
      lifetime: 1800000,
      applicant: id,
      returnURL: `https://localhost:4000?ticket=${ticket.ticket}`,
      attachedDescription: `${state.commentValue}`,
    }),
  });
  if (!res.ok) {
    throw res;
  }
  const request = yield res.json();

  return request.url;
}
