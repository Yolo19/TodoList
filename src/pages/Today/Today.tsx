import React from "react";
import "./Today.css";
import {gql, useQuery} from "@apollo/client";



const Today = () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const TODOTASK = gql`
     {
        
            user(id: ${userId}){
                name
                todoListTasks {
                    title
                }
            }       
        
    }
`;

    const{data, loading,error} = useQuery(TODOTASK,{
        variables:{id: userId}
    });
    
    console.log("t",data)
    //console.log("test",data.user.todoListTasks);
    

    return (
        <div>
          
          <h1 style={{textAlign:"center"}}>Today's Tasks</h1>
          <div>{data?.user?.todoList}</div>
        
        </div>
    );
};
export default Today;