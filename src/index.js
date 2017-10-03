// import node modules
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
// import project files
import configureStore from './store/configureStore';
import NavigationContainer from './containers/Navigation';
import sagas from './sagas';
import setUp from './store/setUp';
// global initialization
const store = configureStore();
sagas.forEach(saga => store.runSaga(saga));
// export App component
export default () => (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
);
