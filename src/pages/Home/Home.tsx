import React from "react";
import { Row, Col} from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./Home.css"
import TaskBasket from "../../components/TaskBasket/TaskBasket";
import Today from "../Today/Today";
import CompletedTask from "../CompletedTask/CompletedTask";
import { Route} from "react-router-dom";
//import { useHistory } from "react-router-dom";

const HomePage = () => {
    //const history = useHistory();

    return (
        <>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col span={4}>
                    <Sidebar />
                </Col>
                <Col span={16}>
                    {/* <TaskBasket /> */}
                    
                <Route exact path={"/"} component={TaskBasket} />
                <Route path={"/today"} component={Today} />
                <Route path={"/completed_task"} component={CompletedTask} />            
                </Col>
            </Row>
        </>
    );
};
export default HomePage;