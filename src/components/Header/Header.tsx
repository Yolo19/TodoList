import React, {useState} from "react";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Dropdown } from "antd"
import "./Header.css"

const Header = () => {
    const [visible, setVisible] = useState(false);

    const showSidebar = () => {
        setVisible(true);
        setVisible(visible);
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Login Out
                </a>
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
                <Col span={2}>
                    <Dropdown overlay={menu}>
                        <button className="user_dropdown-link" onClick={e => e.preventDefault()}>
                            Lu Yu <DownOutlined />
                        </button>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
};

export default Header