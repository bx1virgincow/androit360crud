import { useState } from "react";
import AppBar from "./Appbar/appbar";
import TaskGrid from "./Taskcard/taskcard";

function Dashboard() {
  //state for refreshing page after hitting the create
  //todo button
  const [pagerefresh, setPagerefresh] = useState(false)


  return (
    <div>
      <AppBar setPagerefresh={setPagerefresh} pagerefresh={pagerefresh} />
      <TaskGrid setPagerefresh={setPagerefresh} pagerefresh={pagerefresh}/>
    </div>
  );
}
export default Dashboard;
