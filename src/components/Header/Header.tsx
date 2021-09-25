import React, {useState} from "react";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Dropdown,Avatar } from "antd"
import "./Header.css";
import { gql,useQuery,useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const Header = () => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const username = localStorage.getItem("userName");
    const userImage = localStorage.getItem("userImage");

    const showSidebar = () => {
        setVisible(true);
        setVisible(visible);
    }

    const handleLoginOut = ()=>{
        localStorage.clear();
        history.push("./login");
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <p onClick={handleLoginOut}>
                    Login Out
                </p>
            </Menu.Item>

        </Menu>
    );

    return (
        <div className="header">
            <Row align="middle">
                <Col span={2} offset={1}>
                    <MenuOutlined onClick={showSidebar} className="menu_style" />
                </Col>
                <Col span={18} >
                    <h1 className="header_title">To Do List</h1>
                </Col>
                <Col span={3}>
                    <Dropdown overlay={menu}>
                        <div>
                        <Avatar src={userImage}/>
                        <span className="user_dropdown-link">
                            {username} <DownOutlined />
                        </span>
                        </div>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
};

export default Header