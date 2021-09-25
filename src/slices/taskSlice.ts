import { createSlice } from '@reduxjs/toolkit';

  export interface Todo {
    id: string;
    title: string;
    completed: boolean;
  }

  const initialState:any ={
    todo: [],
    user: null

  };
  

  export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        
      addTodo: (state, action)=>{
        console.log(action.payload);
        // state.todoList = action.payload;
        // console.log(state.todoList);
        
        const newTodo  = {
          tid: Math.random().toString(36).substr(2, 9), // https://gist.github.com/gordonbrander/2230317,
          completed: false,
          title: action.payload
        }
        state.todo.push(newTodo);
      },

      removeTodo: (state, action)=>{
        const index = state.todo.findIndex((todo:any) => todo.tid === action.payload);
        state.todo.splice(index, 1);
      },
      setTodoStatus: (state, action)=>{
        console.log(action.payload);
        const index = state.todo.findIndex((todo:any)=>todo.tid === action.payload.tid);
        state.todo[index].completed = action.payload.completed;
        console.log(state.todo[index].completed);
      }
      
      
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
    },
  })

  // Action creators are generated for each case reducer function
export const { addTodo, removeTodo,setTodoStatus} = taskSlice.actions;

export const selectTodoList = (state:any) => state.Task.todo;

export default taskSlice.reducer