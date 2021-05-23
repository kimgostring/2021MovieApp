import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from '../_actions/user_action';

export default function (SpecificComponent, isLoginAccess, isAdminAccess = null) {
    // isLoginAccess - 로그인 여부에 따라 접근 제한
    // null : 아무나 출입 가능한 페이지
    // true : 로그인한 유저만 출입 가능한 페이지
    // false : 로그인한 유저는 출입 불가능한 페이지
    // adminRoute - 계정의 권한에 따라 접근 제한
    // null : 기본값

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        // server로 요청을 보내 유저의 상태 받아 옴
        useEffect(() => { // 렌더링될 때마다 실행
            dispatch(authUser()).then(res => {
                // console.log(res);
                // 뒤에 붙은 옵션들에 따라 페이지 이동 제한
                if (!res.payload.isAuth) { // 로그인하지 않은 상태
                    if (isLoginAccess) { // 로그인한 사람이 접근할 수 있는 페이지
                        props.history.push('/login');
                    }
                } else { // 로그인한 상태
                    if (isAdminAccess && !res.payload.isAdmin) { // 관리자만 접근 가능한 페이지
                        props.history.push('/');
                    } else if (!isLoginAccess) { // 로그인하지 않은 사람이 접근할 수 있는 페이지
                        props.history.push('/');
                    }
                }
            });
        }, []);

        // 해당 컴포넌트를 리턴해주어야 App.js에서 받아 사용 가능
        return (
            <SpecificComponent />
        );
    };

    return AuthenticationCheck;
}