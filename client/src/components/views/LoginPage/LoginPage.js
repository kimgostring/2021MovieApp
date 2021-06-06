// LoginPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function LoginPage(props) { // 페이지 이동에 사용됨
    const dispatch = useDispatch();

    // email, password state 생성
    // react hook에서 만들 때는 userState(initialState)이용, uses 입력으로 양식 입력하기
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

	// handleSubmit 함수로 감싸게 될 경우, 첫 번째 인자는 data
    const onSubmitHandler = (data, event) => {
        // state 안에 입력한 정보들이 저장되어 있는 상태
        event.preventDefault(); // 안 해주게 되면, 페이지 refresh됨 (default)
        // refresh되는 경우, 뒤에 하려고 하는 작업 해줄 수가 없게 됨
        let body = {
            email: Email,
            password: Password
        };

        // server로 정보를 보내 로그인을 시켜야 함, 보낼 값은 state에 저장되어 있음
        // axios 이용, POST http method 이용하기 - 이 작업을 loginUser에서 하게 됨
        dispatch(loginUser(body)) // action 취하기
            .then(res => { // 성공 시 랜딩페이지로 이동 (react에서 사용하는 방식)
                if(res.payload.success) {
                    window.localStorage.setItem('userId', res.payload.userId) 
                    props.history.push('/');
                } else {
                    alert("Error");
                }
            }); 
    };

    return (
        // 이 안에서 데이터를 변화시키려 할 때에는, state를 변화시켜야 함
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <label>Email</label>
                <input {...register("email", {
                    required: "Email is required.",
                    pattern: {
                        value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                        message: "Email format is wrong."
                    }
                })} onChange={onEmailHandler} /> 
                {errors.email?.message}

                <label>Password</label>
                <input type="password" {...register("password", {
                    required: "Password is required.", 
                    minLength: {
                        value: 5,
                        message: "Password is too short."
                    }
                })} onChange={onPasswordHandler} />
                {errors.password?.message}
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage);