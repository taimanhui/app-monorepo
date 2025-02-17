import JsBridgeDesktopInjected from '../jsBridge/JsBridgeDesktopInjected';
import injectedProviderReceiveHandler from '../provider/injectedProviderReceiveHandler';

import injectJsBridge from './factory/injectJsBridge';
import injectWeb3Provider from './factory/injectWeb3Provider';

// - send
const bridge = new JsBridgeDesktopInjected({
  receiveHandler: injectedProviderReceiveHandler,
});
injectJsBridge(bridge);

injectWeb3Provider();
// - receive
// host executeJs `window.$onekey.jsBridge.receive()` directly
