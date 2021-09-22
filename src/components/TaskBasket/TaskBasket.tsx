import React, { useState } from "react";
import { List, Input, Button} from "antd";
//import { List, Input, Button, Checkbox } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./TaskBasket.css";
//import { useDispatch, useSelector } from "react-redux";
//import { selectTodoList, addTodo, removeTodo, setTodoStatus } from "../../slices/taskSlice"
//import { useEffect } from "react";

import { useMutation, gql,useQuery } from "@apollo/client";

// const LOAD_USERS= gql`
//             query {
//                 users{
//                     nodes {
//                       id
//                       name
//                       gitHub
//                       imageURI
//                     }
//                   }
//             }
//     `;

const ADD_TODO = gql `
        mutation AddTodoListTask($title: String){
             
                id
            
        }
    `;

const GET_TODO_LIST = gql`
        query {
            users (id:1) {
                nodes {
                    name
                }
            }
        }
`;

const TaskBasket = () => {
    //const { data} = useQuery(LOAD_USERS);
    const data2 = useQuery(GET_TODO_LIST);
    //console.log("1", data);
    console.log("1", data2);
    const [taskName, setTaskName] = useState("");
    const [addTodo] = useMutation(ADD_TODO);

    const handleChange = (e: any) => {
        setTaskName(e.target.value);
    }


    // const clickToCompleted = (todoId: string) => {
    //     dispatch(setTodoStatus({ completed: !todoList.completed, id: todoId }))
    // }

    return (
        <div>
            <div className="creat_task_basket_container">
                <div className="add_task_oparation_container">
                    <Input className="add_task_input"
                        placeholder="What need to be done?"
                        onChange={handleChange}
                    />
                    <Button shape="round" icon={<PlusOutlined />} onClick={e=>{addTodo({ variables: { title: taskName } });}} className="btn">
                        Add Task
                    </Button>
                </div>
                <div>
                    <List
                        itemLayout="horizontal"
                    >
                        {/* {todoList.map((items: any, index:number) => (
                            <List.Item key={items.id}>
                                <Checkbox
                                    value={items.completed}
                                    onChange={()=>clickToCompleted(items.id)}
                                >
                                    <List.Item style={{
                                        textDecoration: items.completed? "line-through" : "none",
                                    }}>
                                        {items.title}
                                    </List.Item>
                                </Checkbox>
                                <List.Item actions={[<Button onClick={removeTodoTask}>remove</Button>]}></List.Item>
                            </List.Item>
                        ))} */}

                    </List>


                </div>

            </div>
        </div>
    )
};
export default TaskBasket;
