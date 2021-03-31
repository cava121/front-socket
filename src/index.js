import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducers from './redux/store/redux-store';
import AppContainer from './AppContainer';

const store = createStore(reducers, applyMiddleware(thunk, logger));

store.subscribe(() => {});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
