import {useState} from "react";
import {collection, addDoc, Timestamp} from "firebase/firestore";
import db from './connectDB'

function CreateTaskForm() {

    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        addDoc(collection(db, 'tasks'), {
            title,
            created: Timestamp.now()
        }).then(r => console.log(r))
            .catch(err => console.log(err))

        setTitle('') // clear input
    };

    return (
        <form className={"input-group mb-3"}>
            <input
                className={"form-control"}
                type={"text"} placeholder={'Enter task title'}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button className={"btn btn-primary"} type={"submit"} onClick={handleSubmit}>Add Task</button>
        </form>
    );
}

export default CreateTaskForm;