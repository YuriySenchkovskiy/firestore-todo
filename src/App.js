import CreateTaskForm from "./CreateTaskForm";
import TaskList from "./TaskList";
import {useState} from "react";
import EditTaskForm from "./EditTaskForm";
import {getKeyEventProps} from "@testing-library/user-event/dist/keyboard/getEventProps";

/**
 * The App component is the main component of the application.
 *
 * It contains the CreateTaskForm and TaskList components that allow users to create and manage tasks.
 *
 * @returns {JSX.Element} The JSX element representing the App component.
 */
function App() {

    const [editTaskId, setEditTaskId] = useState(null);

    const onEdit = (id) => {
        console.log(id)
        setEditTaskId(id);
    }

    const onEditCancel = () => {
        setEditTaskId(null)
    }

    return (
    <div className="container">

      <CreateTaskForm/>
      <TaskList onEdit={onEdit}/>
        {editTaskId && <EditTaskForm id={editTaskId} onEditCancel={onEditCancel}/>}
      {/*<EditTaskForm id={editTaskId} onEditCancel={onEditCancel}/>*/}

    </div>
    );
}

export default App;
