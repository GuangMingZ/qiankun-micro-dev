/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useReducer, useCallback } from 'react';
import { Dialog } from 'tdesign-react';
import { useKeyPress } from 'ahooks';
import { handleKeyCode } from './utils';
import MicroFeTable from './components/micro-fe-table';
import MicroFePopup from './components/micro-fe-popup';
import { Provider, contextReducer, defaultContext, ACTION } from './context';
import useMicroDevData, { S_KEY } from './hooks/use-micro-dev-data';

export { S_KEY };

/**
 * 微前端联调模式组件
 * @returns
 */
export default function MicroDevMode(): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const [data,,saveData] = useMicroDevData();
  const [currentContext, dispatchContext] = useReducer(contextReducer, defaultContext);

  const microDevApp = useMemo(() => currentContext?.configData?.filter(e => e.devSwitch), [currentContext?.configData]);

  useEffect(() => {
    (window as any).microDev = (open: any = undefined) => {
      setVisible(open === undefined ? true : Boolean(open));
    };
  }, []);

  useEffect(() => {
    if (data) {
      dispatchContext({
        type: ACTION.SAVE_CONFIG_DATA,
        data,
      });
    }
  }, [data]);

  useKeyPress(
    handleKeyCode('KeyM'),
    () => {
      setVisible(prev => !prev);
    },
  );

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const onConfirm = () => {
    const { configData } = currentContext;
    if (configData) {
      saveData(configData);
    }
    window.location.reload();
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };
  return (
    <Provider value={{ ...currentContext, modalVisible: visible, dispatchContext }}>
      {microDevApp?.length ? <MicroFePopup count={microDevApp?.length} onClick={openModal} /> : null}
      <Dialog
        header="Micro Dev"
        width={800}
        visible={visible}
        confirmOnEnter
        onConfirm={onConfirm}
        onCancel={onCancel}
        onEscKeydown={onCancel}
        onCloseBtnClick={onCancel}
        onOverlayClick={onCancel}
      >
        <MicroFeTable />
      </Dialog>
    </Provider>
  );
}
