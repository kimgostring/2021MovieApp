import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Button } from 'antd';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPW, setConfirmPW] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPWHandler = (event) => {
        setConfirmPW(event.currentTarget.value);
    };

    const onSubmitHandler = (data, event) => {
        event.preventDefault();

        let body = {
            email: Email,
            name: Name,
            password: Password
        };

        dispatch(registerUser(body)) 
            .then(res => { 
                if(res.payload.success) {
                    props.history.push('/login');
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
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Input placeholder="Email" {...register("email", {
                    required: "Email is required.",
                    pattern: {
                        value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                        message: "Email format is wrong."
                    }
                })} onChange={onEmailHandler} /> 
                {errors.email?.message}
                <br />

                <Input placeholder="Name" {...register("name", {
                    required: "Name is required."
                })} onChange={onNameHandler} />
                {errors.name?.message}
                <br />

                <Input.Password placeholder="Password" {...register("password", {
                    required: "Password is required.",
                    minLength: {
                        value: 5,
                        message: "Password is too short."
                    }
                })} onChange={onPasswordHandler} />
                {errors.password?.message}
                <br />

                <Input.Password placeholder="Confirm password" {...register("confirmPW", {
                    validate: value => value === Password || "Password doesn't match."
                })} onChange={onConfirmPWHandler} />
                {errors.confirmPW?.message}
                <br />

                <Button shape="round" htmlType="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default withRouter(RegisterPage);
