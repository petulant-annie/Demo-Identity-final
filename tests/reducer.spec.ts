import { assert } from 'chai';

import demoState, { initialState } from '../reducers/demoReducers';
import { DemoModel } from '../models/stateModel';

import {
  ISetCheckboxesAction,
  ISetPreloaderAction,
  ICheckErrorAction,
  ISetEmailFieldValueAction,
  ISetCommentValueAction,
} from '../actions/demoActions';

describe('demo reducer', () => {
  it('TOGGLE_CHECKBOX', () => {
    const checkboxes = [null, 'license', null, null];
    const toggle = { checkboxes, type: 'TOGGLE_CHECKBOX' };
    assert.deepEqual(
      demoState(new DemoModel(initialState), toggle as ISetCheckboxesAction).get('checkboxes'),
      checkboxes,
    );
  });
  it('SHOW_PRELOADER', () => {
    const preloader = { showPreloader: true, type: 'SHOW_PRELOADER' };
    assert.deepEqual(
      demoState(new DemoModel(initialState), preloader as ISetPreloaderAction).get('showPreloader'),
      true,
    );
  });
  it('ERROR', () => {
    const err = { error: true, type: 'ERROR' };
    assert.deepEqual(
      demoState(new DemoModel(initialState), err as ICheckErrorAction).get('error'),
      true,
    );
  });
  it('EMAIL_FIELD_VALUE', () => {
    const value = { phone: 78978978876 };
    const fieldValue = { value, type: 'EMAIL_FIELD_VALUE' };
    assert.deepEqual(
      demoState(new DemoModel(initialState), fieldValue as ISetEmailFieldValueAction).get('value'),
      value,
    );
  });
  it('COMMENT_FIELD_VALUE', () => {
    const commentValue = 'some text';
    const commentField = { commentValue, type: 'COMMENT_FIELD_VALUE' };
    assert.deepEqual(
      demoState(new DemoModel(initialState), commentField as ISetCommentValueAction)
        .get('commentValue'),
      commentValue,
    );
  });
});
