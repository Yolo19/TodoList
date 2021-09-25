import React, { useState } from "react";
//import { List, Input, Button} from "antd";
import { List, Input, Button, Checkbox } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./TaskBasket.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoList, addTodo, removeTodo, setTodoStatus } from "../../slices/taskSlice"
import { useMutation } from "@apollo/client";
import {ADD_TASK} from "../../service/api"



const TaskBasket = () => {
    const dispatch = useDispatch();
    const todoList = useSelector(state => (selectTodoList(state)));
    const [taskName, setTaskName] = useState("");
    const [addTask] = useMutation(ADD_TASK)


    interface data {
        time: string;
        title: string;
    }

    const handleChange = (e: any) => {
        setTaskName(e.target.value);
    }

    const createAnNewTask = () => {
        dispatch(addTodo(taskName));
        console.log("test", todoList[todoList.length-1]);
        addTask({variables: {
            title: "title",
            completed: false,
            description: "test"
        }}).catch(reason=>{console.log("reason",reason)})
    }

    const removeTodoTask = () => {
        dispatch(removeTodo(todoList.id));
        setTaskName("");
    }

    const clickToCompleted = (todoId: string) => {
        dispatch(setTodoStatus({ completed: !todoList.completed, id: todoId }))
    }

    return (
        <div>
            <div className="creat_task_basket_container">
                <div className="add_task_oparation_container">
                    <Input className="add_task_input"
                        placeholder="What need to be done?"
                        onChange={handleChange}
                    />
                    <Button shape="round" icon={<PlusOutlined />} onClick={createAnNewTask} className="btn">
                        Add Task
                    </Button>
                </div>
                <div>
                    <List
                        itemLayout="horizontal"
                    >
                        {todoList.map((items: any, index:number) => (
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
                        ))}

                    </List>


                </div>

            </div>
        </div>
    )
};
export default TaskBasket;
