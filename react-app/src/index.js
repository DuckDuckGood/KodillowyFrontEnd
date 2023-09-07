import './styles/normalize.scss';
import './styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);