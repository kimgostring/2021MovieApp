// _reducers/user_reducer.js
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

const userReducer = function (state = {}, action) {
    let result;

    switch (action.type) {
        case LOGIN_USER :
            // ...state -> spread operator 이용, state값 분해 가능
            // 이 값들을 빈 객체에 넣어주면 객체 복사 (참조 공유 X) 가능
            result = { ...state, loginSuccess: action.payload };
            break;
        
        case REGISTER_USER : 
            result = { ...state, registerSuccess: action.payload };
            break;

        case AUTH_USER :
            result = { ...state, userData: action.payload };
            break;

        default :
            result = state;
    };

    return result;
};

export default userReducer;