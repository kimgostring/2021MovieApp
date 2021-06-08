import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { USER_SERVER } from '../../../../Config'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'

function RightMenu(props) {
    const [IsLogin, setIsLogin] = useState(false);

    useEffect(() => { // 로그인 여부 확인
        Axios.get('/api/users/auth')
        .then(res => {
            console.log(res);
            if (res.data.isAuth) { // 로그인 되어 있는 경우
                setIsLogin(true);
            } 
        })
    }, []);

    const loginOutHandler = () => {
        if (IsLogin) { // 로그인된 경우
            Axios.get(`${USER_SERVER}/logout`)
            .then(res => {
                if (res.data.success) {
                    window.localStorage.setItem('userId', null);
                    setIsLogin(false);

                    props.history.push("/");
                } else {
                    alert("Error");
                }
            });
        } else { // 로그인되지 않은 경우, 로그인 버튼 필요
            props.history.push("/login");
        }
    };

    const registerHandler = () => {
        props.history.push("/register");
    }

    return (
        <div style={{ float: 'right', marginTop: '20px'}} mode={props.mode}>
            <Button shape="round" style={{ margin: '0 5px' }} onClick={loginOutHandler}>
                { IsLogin ? "Logout" : "Login" }
            </Button>

            { !IsLogin && 
                <Button shape="round" style={{ margin: '0 5px' }} onClick={registerHandler}>
                    Register
                </Button>
            }
        </div>
    )
}

export default withRouter(RightMenu)
