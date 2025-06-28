import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import AppRoutes from './routes';
import 'antd/dist/reset.css';

ReactDOM.render(
  <Provider>
    <AppRoutes />
  </Provider>,
  document.getElementById('root')
)