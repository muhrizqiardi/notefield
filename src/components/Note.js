import { useContext } from "react";
import { AppContext } from "..";

import eventBus from "../eventBus";

function Note(props) {
    const [appContext, setAppContext] = useContext(AppContext);

    const openNote = () => {
        let appContextCopy = { ...appContext };
        appContextCopy.currentNote = props.id;
        setAppContext(appContextCopy);
        eventBus.dispatch("openNote", {noteId: props.id})
    };

    return (
        <div
            id={`note-${props.id}`}
            className='note'
            onClick={openNote}>
            <h4 className="title">{(props.title ? props.title : "(Empty Title)")}</h4>
            <p className="content">
                {(props.content ? `${props.content.slice(0,200)}${props.content.length <=300 ? "" : '...'}` : "(Empty note)")}
            </p>
        </div>

    );
}
export default Note;
