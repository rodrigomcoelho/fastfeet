import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers => {
  const persistedRecuders = persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );

  return persistedRecuders;
};
