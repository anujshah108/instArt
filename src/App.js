import React from 'react';
import { Provider } from 'react-redux';

import Store from './Store';
import BaseNavigation from './Router';
import Main from './components/Main';

const App = () => (
  <Provider store={Store}>
    <Main />
  </Provider>
);

export default App;
