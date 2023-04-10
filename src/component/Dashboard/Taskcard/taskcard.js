import { useContext, useEffect, useState } from "react";
import { TaskListContext } from "../../../App";
import "./taskcard.css";

function TaskCard({ title, description, status, date, cardId, setRefresh }) {
  const statusColor =
    status === "completed" ? "green" : status === "pending" ? "gold" : "red";

  //delete handler
  const deleteTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:1234/task/deletetask/" + cardId,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        setRefresh(true);
      }
      const jsonResponse = response.json();
      console.log("json response", jsonResponse);
    } catch (e) {
      throw e;
    }
  };
  return (
    <div className="card-main-div">
      <div className="card-div">
        <div className="task-card-delete-icon">
          <button onClick={deleteTodo}>Delete</button>
        </div>
        <div className="card-description">{description}</div>
        <div className="highlight">
          <span>{title}</span>
          <span
            style={{ backgroundColor: statusColor }}
            className="task-card-statuscolor"
          ></span>
        </div>
      </div>
    </div>
  );
}

function TaskGrid({pagerefresh, setPagerefresh}) {
  //use State
  const [taskList, setTaskList] = useState([]);
  // const [refresh, setRefresh] = useState(false);
  //importing Tasklist context from state
  const { todoList, appendTodo } = useContext(TaskListContext);

  //fetch data from the backend
  const fetchTodo = async () => {
    try {
      const response = await fetch("http://localhost:1234/task/gettask", {
        method: "GET",
      });
      const jsonResponse = await response.json();
      // appendTodo([...jsonResponse]);
      setTaskList(jsonResponse);
      console.log("response", jsonResponse);
    } catch (e) {
      console.log("e", e);
      throw e;
    }
  };

  //usestate
  useEffect(() => {
    fetchTodo();
  }, []);

  useEffect(() => {
    if (pagerefresh) {
      fetchTodo();
      setPagerefresh(false);
    }
  }, [pagerefresh]);

  //

  //useEffect
  // useEffect(() => {
  //   console.log({todoList})
  //   if(todoList != undefined){
  //         setTaskList([...todoList]);
  //   }

  // }, [todoList]);

  return (
    <div className="task-card-grid">
      {taskList.map((value, key) => (
        <TaskCard
          key={key}
          title={value.title}
          description={value.description}
          status={value.status}
          date={value.date}
          cardId={value._id}
          setRefresh={setPagerefresh}
        />
      ))}
    </div>
  );
}
export default TaskGrid;
