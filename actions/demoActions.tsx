import { Action } from 'redux';

export interface ISetCheckboxesAction extends Action {
  checkboxes: string[] | null[];
}
export interface ISetPreloaderAction extends Action {
  showPreloader: boolean;
}
export interface ICheckErrorAction extends Action {
  error: boolean;
}
export interface ISetEmailFieldValueAction extends Action {
  value: {};
}
export interface ISetCommentValueAction extends Action {
  commentValue: string;
}

export const toggleCheckbox = (checkboxes: string[] | null[]): ISetCheckboxesAction => ({
  checkboxes,
  type: 'TOGGLE_CHECKBOX',
});

export const showPreloaderAction = (showPreloader: boolean): ISetPreloaderAction => ({
  showPreloader,
  type: 'SHOW_PRELOADER',
});

export const errorAction = (error: boolean): ICheckErrorAction => ({
  error,
  type: 'ERROR',
});

export const emailFieldValue = (value: {}): ISetEmailFieldValueAction => ({
  value,
  type: 'EMAIL_FIELD_VALUE',
});

export const commentFieldValue = (commentValue: string): ISetCommentValueAction => ({
  commentValue,
  type: 'COMMENT_FIELD_VALUE',
});

export const sendRequest = () => ({
  type: 'SEND_REQUEST',
});
