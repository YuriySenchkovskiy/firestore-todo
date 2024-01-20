import {useEffect, useState} from "react";
import {collection, addDoc, Timestamp, doc, getDoc, updateDoc} from "firebase/firestore";
import db from './connectDB'

function EditTaskForm(props) {

    const [title, setTitle] = useState('');

    useEffect(() => {
        if(!props.id) return null;
        // get task doc from firestore
        getDoc(doc(db, 'tasks', props.id)).then(doc => {
            if (doc.exists()) {
                setTitle(doc.data().title);
            }
        });
    }, [props.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDoc(doc(db, 'tasks', props.id), {title})
            .then(r => console.log(r))
            .catch(err => console.log(err))
        props.onEditCancel();
        setTitle('');
    };

    const handeCancel = () => {
        props.onEditCancel();
        setTitle('');
    }

    if(!title || !props.id) return null;

    return (
        <form>
            <input
                type={"text"} placeholder={'Enter task title'}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button type={"submit"} onClick={handleSubmit}>Save</button>
            <button type={"submit"} onClick={handeCancel}>Cancel</button>
        </form>
    );
}

export default EditTaskForm;