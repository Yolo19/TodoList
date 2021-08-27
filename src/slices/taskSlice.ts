import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

  export interface Todo {
    id: string;
    title: string;
    completed: boolean;
  }

  const initialState:any =[];

  // const initialState = {
  //   todoId: null,
  //   todoList: []
  // }
// First, create the thunk
// export const fetchTaskById = createAsyncThunk('tasks/fetchTaskByIdStatus',async (taskId, { rejectWithValue }) => {
//     try {
//         const res = await getTask();
//         return res;
//       } catch (e) {
//         return rejectWithValue(e.message);
//       }        
// });
    
  

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
          id: Math.random().toString(36).substr(2, 9), // https://gist.github.com/gordonbrander/2230317,
          completed: false,
          title: action.payload
        }
        state.push(newTodo);
      },
      removeTodo: (state, action)=>{
        const index = state.findIndex((todo:any) => todo.id === action.payload);
        state.splice(index, 1);
      },
      setTodoStatus: (state, action)=>{
        console.log(action.payload);
        const index = state.findIndex((todo:any)=>todo.id === action.payload.id);
        state[index].completed = action.payload.completed;
        console.log(state[index].completed);
      }
      
      
    },
    // extraReducers: (builder) => {
    //     // Add reducers for additional action types here, and handle loading state as needed
    //     builder.addCase(fetchTaskById.fulfilled, (state, action) => {
    //       // Add user to the state array
          
    //     })
    // },
  })

  // Action creators are generated for each case reducer function
export const { addTodo, removeTodo,setTodoStatus} = taskSlice.actions;

export const selectTodoList = (state:any) => state.Task;

export default taskSlice.reducer