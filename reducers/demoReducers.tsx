import {
  ISetCheckboxesAction,
  ISetPreloaderAction,
  ICheckErrorAction,
  ISetEmailFieldValueAction,
  ISetCommentValueAction,
} from '../actions/demoActions';
import { DemoModel } from '../models/stateModel';

export interface IInitialState {
  checkboxes: string[] | null[];
  showPreloader: boolean;
  error: boolean;
  value: {};
  commentValue: string;
  request: boolean;
}

export const initialState: IInitialState = {
  checkboxes: [null, null, null, null],
  showPreloader: false,
  error: false,
  value: {},
  commentValue: '',
  request: false,
};

const demoState = (
  state: DemoModel = new DemoModel(initialState),
  action: ISetCheckboxesAction |
    ISetPreloaderAction | ICheckErrorAction |
    ISetCommentValueAction | ISetEmailFieldValueAction,
) => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      const { checkboxes } = action as ISetCheckboxesAction;
      state.find('checkboxes').set(checkboxes);

      return state;
    case 'SHOW_PRELOADER':
      const { showPreloader } = action as ISetPreloaderAction;
      state.find('showPreloader').set(showPreloader);

      return state;
    case 'ERROR':
      const { error } = action as ICheckErrorAction;
      state.find('error').set(error);

      return state;
    case 'EMAIL_FIELD_VALUE':
      const { value } = action as ISetEmailFieldValueAction;
      state.find('value').set(value);

      return state;
    case 'COMMENT_FIELD_VALUE':
      const { commentValue } = action as ISetCommentValueAction;
      state.find('commentValue').set(commentValue);

      return state;
    default:
      return state;
  }
};

export default demoState;
