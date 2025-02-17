import { PayloadAction } from '@reduxjs/toolkit';

import inpageProviderUi from '@onekeyhq/inpage-provider/src/extension/ui';
import {
  IJsBridgeMessagePayload,
  IJsonRpcRequest,
} from '@onekeyhq/inpage-provider/src/types';
import backgroundApiProxy from '@onekeyhq/kit/src/background/instance/backgroundApiProxy';
import store from '@onekeyhq/kit/src/store';

function init() {
  const jsBridgeReceiveHandler = (payload: IJsBridgeMessagePayload) => {
    console.log('jsBridgeReceiveHandler Ext-UI', payload);
    const { method, params } = payload.data as IJsonRpcRequest;
    if (method === 'dispatchActionBroadcast') {
      store.dispatch(params as PayloadAction);
    }
  };
  // TODO rename global.$extensionJsBridgeUiToBg
  window.extJsBridgeUiToBg = inpageProviderUi.createUiJsBridge({
    receiveHandler: jsBridgeReceiveHandler,
    onPortConnect() {
      backgroundApiProxy.getStoreState().then((state: any) => {
        console.log('state from background', state);
        store.dispatch({
          // TODO use consts
          type: 'REPLACE_WHOLE_STATE',
          payload: state,
        });
      });
    },
  });
}

export default {
  init,
};
