import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql
  } from "@apollo/client";

const LoginForm = () => {
    const history = useHistory();
    
    const CLIENT_ID = "200f667a68ca9427379e";
    const REDIRECT_URI = "http://localhost:3000";
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    const code = url.split("?code=")[1];
    console.log(url);
    console.log(code);

    
    const Login_AccessToken = gql`
        mutation($code:String!){
                login(input:{code: $code}){
                    jwt
                }
            }
        `;

    const LOAD_USERS= gql`
            query {
                users{
                    nodes {
                      id
                      name
                      gitHub
                      imageURI
                    }
                  }
            }
    `
    
    //const {loading, error, data} = useQuery(LOAD_USERS);
    const [mutateFunction, { data, loading, error }] = useMutation(Login_AccessToken);
    console.log("1", data);

    const onFinish = (value: any) => {
        console.log(value);
    }

    const handleClick = ()=>{        
        history.push("/");
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