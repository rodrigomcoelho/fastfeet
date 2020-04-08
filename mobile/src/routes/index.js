import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Sign from './sign.routes';
import Dashboard from './dashboard.routes';

export default (isSigned = false) => (
  <NavigationContainer>
    {isSigned ? <Dashboard /> : <Sign />}
  </NavigationContainer>
);
