import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunx from 'redux-thunk';
import Reducer from './_reducers/index';

const createStoreWithMiddle = applyMiddleware(promiseMiddleware, ReduxThunx)(createStore);
// 아직 함수 실행 X, 실행을 위해서는 createStore의 인자 넣어주어야 함
// 미들웨어 적용된 createStore을 만들기만 함

ReactDOM.render(
  <Provider
    store={ createStoreWithMiddle(Reducer, 
      // 앞뒤로 __ 꼭 추가해주어야 함
      window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__()
    ) /* Redux Devtools store enhancer 연결 */ } 
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
