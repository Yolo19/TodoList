import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd"
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  const history = useHistory();

  const handleMenuClick = (e:any)=>{
      console.log(e);
      if(e.key==="task_basket"){
          history.push("/");
      }
      if(e.key==="today"){
          history.push("/today");
      }
      if(e.key==="completed_task"){
          history.push("/completed_task");
      }
  };

  return (
    <div>
      <Menu
        onClick={handleMenuClick}
        style={{ height: "100vh" }}
        defaultSelectedKeys={['task_basket']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="task_basket" icon={<MailOutlined />}>
            Task Basket
        </Menu.Item>
        <Menu.Item key="today" icon={<MailOutlined />}>
            Today
        </Menu.Item>
        <Menu.Item key="completed_task" icon={<MailOutlined />}>
            Completed
        </Menu.Item>
        
      </Menu>
    </div>
  );
};

export default Sidebar