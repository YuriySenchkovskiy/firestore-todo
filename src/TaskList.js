import db from './connectDB';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {useEffect, useState} from "react";

/**
 * Represents a component for rendering a list of tasks.
 *
 * @return {JSX.Element} The rendered component.
 */
function TaskList(props) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const taskColRef = query(collection(db, 'tasks'), orderBy('created', 'asc'));
        onSnapshot(taskColRef, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        });
    }, []);

    const onDeleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, 'tasks', taskId));
        } catch (error) {
            console.log(error)
        }
    };

    // onToggleDone handler function to edit task status in firestore
    const onToggleDone = (id) => {
        const task = tasks.find(task => task.id === id);
        const updatedTask = {...task, completed: !task.completed};

        updateDoc(doc(db, 'tasks', id), updatedTask)
            .then(r => console.log(r))
            .catch(err => console.log(err))
    };

    return (
            <ul className={'list-group'}>
                { tasks.map(task => (
                    <li className={'list-group-item'} key={task.id}>
                        <div className={"row"}>
                            <div className="col-8">
                                {task.completed ? <s>{task.title}</s> : task.title}
                            </div>
                            <div className="col-4">
                                <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                                <button onClick={() => onToggleDone(task.id)}>Done</button>
                                <button onClick={() => props.onEdit(task.id)}>Edit</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
    );
}

export default TaskList;
