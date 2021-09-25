import React, { useEffect} from "react";
import { Form, Input, Button} from "antd";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import {useMutation} from "@apollo/client";
import { useDispatch} from "react-redux";
import {REQUEST_LOGIN} from "../../service/api";


const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const CLIENT_ID = "200f667a68ca9427379e";
    const REDIRECT_URI = "http://localhost:3000/login";
    const url = window.location.href;
    const code = url.split("?code=")[1];
    console.log(url);
    console.log(code);
      
    const [login] = useMutation(REQUEST_LOGIN);
    

    useEffect(() => {
        const loginMethod = async () => {
          if (code != null) {
            try {
              const { data } = await login({ variables: { code } });
              if (data != null) {
                console.log("token",data.login.jwt);
                localStorage.setItem("token", data.login.jwt)
                localStorage.setItem("userId", data.login.user.id)
                localStorage.setItem("userName", data.login.user.name)
                localStorage.setItem("userImage", data.login.user.imageURI)
              }
            } catch (e) {
              console.log(e);
            }
            history.push('/');
          }
        };
        loginMethod();
      }, [code]);

    const handleClick = ()=>{
        localStorage.getItem('token');     
        console.log("111")
    }

    return (
        <div className="LoginPageDiv">
            <Form className="LoginContainer">
                <Form.Item
                    name="bizex_catering_pos_username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input
                        size="large"
                        placeholder="Username"
                        className="LoginInput"
                    />
                </Form.Item>

                <Form.Item
                    name="bizex_catering_pos_password"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input
                        type="password"
                        size="large"
                        placeholder="Password"
                        className="LoginInput"
                    />
                </Form.Item>

                <Form.Item >
                    <Button size="large" htmlType="submit" className="SubmitBtn" onClick={handleClick}>
                        Login In
                    </Button>
                    <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>Login with Github</a>
				</Form.Item>

            </Form>
        </div>


    );
};

export default LoginForm;