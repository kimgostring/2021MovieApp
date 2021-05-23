import React from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { USER_SERVER } from '../../../Config';

function LandingPage(props) {
    const onClickHandler = () => {
        axios.get(`${USER_SERVER}/logout`)
            .then(res => {
                if (res.data.success) {
                    props.history.push("/login");
                } else {
                    alert("Error");
                }
            });
    };
    
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    );
}

export default withRouter(LandingPage);
