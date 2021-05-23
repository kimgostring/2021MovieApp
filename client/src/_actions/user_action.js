// _actions/user_action.js
import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {
    // server로 정보를 보내 로그인을 시켜야 함, 보낼 값은 state에 저장되어 있음 
    // (dataToSubmit 객체로 넘겨받음)
    // axios 이용, POST http method 이용하기
    const request = axios.post('/api/users/login', dataToSubmit) 
    // 원래는 bodt를 위에 넣어주어야 하나, redux 사용하면 dispatch action에 넣어주어야 함
        .then(res => res.data); // 받아 온 데이터 request에 저장
    
    // return을 통해 reducer로 보냄
    // reducer에서, 현재 state와 action을 받아 nextState 만들어주게 됨
    return {
        type: LOGIN_USER,
        payload: request
    };
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit) 
        .then(res => res.data); 
    
    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function authUser() {
    // get method일 때에는 body가 필요 X, 쿼리 스트링을 통해 전달됨
    // body는 post 방식에서 
    // get은 데이터 요청 시에만 사용, post는 데이터 생성/수정할 때 사용 
    const request = axios.get('/api/users/auth')
        .then(res => res.data);

    return {
        type: AUTH_USER,
        payload: request
    };
}