import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const history = useHistory();
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
				</Form.Item>

            </Form>
        </div>


    );
};

export default LoginForm;