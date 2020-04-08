import { COMPUTER_IP } from 'react-native-dotenv';
import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronReduxSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: COMPUTER_IP })
    .useReactNative()
    .use(trackGlobalErrors())
    .use(reactotronRedux())
    .use(reactotronReduxSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
