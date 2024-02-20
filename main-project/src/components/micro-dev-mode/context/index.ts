/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext } from 'react';
import { IMicroDevTableRow } from '../index.type';

/**
 * micro-dev-mode组件Context
 */
export enum ACTION {
  SAVE_DIALOG_VISIBLE = 'SAVE_DIALOG_VISIBLE',
  SAVE_CONFIG_DATA = 'SAVE_CONFIG_DATA',
}

export interface IContext {
  modalVisible: boolean;// micro-dev-mode弹窗是否打开
  configData?: IMicroDevTableRow[];
  dispatchContext?: React.Dispatch<IContextAction>;
}

export interface IContextAction {
  type: ACTION;
  data?: any;
  [key: string]: any;
}

export const defaultContext: IContext = {
  modalVisible: false,
  configData: undefined,
};

export const contextReducer: (prevState: IContext, action: IContextAction) => IContext = (
  prevState,
  { type, ...payload },
): IContext => {
  const { data } = payload;
  switch (type) {
    case ACTION.SAVE_DIALOG_VISIBLE:
      return { ...prevState, modalVisible: data };
    case ACTION.SAVE_CONFIG_DATA:
      return { ...prevState, configData: data };
    default:
      return prevState;
  }
};

const PopupContext = createContext(defaultContext);

export const { Provider, Consumer } = PopupContext;

export default PopupContext;
