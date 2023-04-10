import "./global.css";
import { createContext, useReducer } from "react";

import Dashboard from "./component/Dashboard";

//the initial state and actions
const initialState = {
  todoList: [],
  newTask: {
    title: "",
    description: "",
    dateDue: "",
  },
};

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "createNewTask":
      return {
        newTask: {
          ...state.newTask,
          title: action.task.title,
          description: action.task.description,
          dateDue: action.task.dateDue,
        },
      };
      case "appendTodo":{
        return {
          todoList: [
           state.todoList.push(action.todoList)
          ]
        }
      }
    default:
      return state;
  }
};

//creating context
export const TaskListContext = createContext();
//provider for wrapping the entire dashboard
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    newTask: state.newTask,
    addTodo: (task) => {
      dispatch({ type: "createNewTask", task });
    },
    todoList: state.todoList,
    appendTodo: (todoList)=>{
      dispatch({type: "appendTodo", todoList})
    }
  };

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  );
};

function App() {
  return (
    <Provider>
      <Dashboard />
    </Provider>
  );
}
export default App;
