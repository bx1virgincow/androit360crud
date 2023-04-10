import { useState, useContext, useEffect } from "react";
import { TaskListContext } from "../../../App";
import "./appbar.css";

//Overlay component
function AddTodoOverlayDiaglog({ setOverlayForm, setPagerefresh}) {
  //
  //deconstruct new task
  const { newTask, addTodo } = useContext(TaskListContext);

  //setting state for the variable
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    dateDue: "",
  });

  //use effect
  useEffect(() => {
    addTodo(inputValue);
  }, [inputValue]);

  //onchange function for input
  const inputOnchange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  //cancel button
  const btnCancel = () => {
    setOverlayForm(false);
  };

  //create a todo
  const createTodo = async (e) => {
    e.preventDefault();
    console.log(newTask)
    try {
      const response = await fetch("http://localhost:1234/task/createtask", {
        method: "POST",
        headers:{'content-type':'application/json'},
        body: JSON.stringify(inputValue),
      });
      if(response.status === 201){
        setPagerefresh(true)
      }
      const responseBody = await response.json()
      console.log('body', responseBody)
    } catch (e) {
      console.log("e" + e);
      throw e;
    }

    console.log(newTask);
    setInputValue({
      ...inputValue,
      "title": "",
      "description": "",
      "date": "",
    });

    setOverlayForm(false)
  };

  return (
    <div className="todo-overlay">
      <div>
        <form onSubmit={createTodo} className="todo-form">
          <div class="form-div">
            <input
              type="text"
              id="title"
              placeholder="title"
              name="title"
              value={inputValue.title}
              onChange={inputOnchange}
            />
          </div>

          <div class="form-div">
            <textarea
              id="description"
              name="description"
              placeholder="description"
              className="description-area"
              value={inputValue.description}
              onChange={inputOnchange}
            ></textarea>
            {/* <input type="textarea" id="description" placeholder="description" /> */}
          </div>

          <div class="form-div">
            <input
              type="date"
              name="dateDue"
              id="dateDue"
              value={inputValue.dateDue}
              onChange={inputOnchange}
            />
          </div>
          <div className="button-div">
            <button value="submit" className="todo-form-button">
              Create
            </button>
            <button onClick={btnCancel} className="todo-form-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//AppBar component
function AppBar({setPagerefresh}) {
  //overlay form
  const [overlayForm, setOverlayForm] = useState(false);

  //new todo list handler
  const showForm = () => {
    setOverlayForm(true);
  };
  //
  return (
    <div className="appbar-main-container">
      <div className="appbar-list-container">
        <button onClick={showForm}>New List</button>
      </div>
      <div className="appbar-list-container">
        <button>List</button>
        <button>Scheduled</button>
        <button>Today</button>
      </div>

      <div className="appbar-list-container">
        <button>menu</button>
        <button>selelct</button>
        <button>search</button>
      </div>
      {overlayForm && <AddTodoOverlayDiaglog setOverlayForm={setOverlayForm} setPagerefresh={setPagerefresh}/>}
    </div>
  );
}

export default AppBar;


