import { useContext } from "react";
import { AppContext } from "..";

function Note(props) {
    const [appContext, setAppContext] = useContext(AppContext);

    const openNote = () => {
        let appContextCopy = { ...appContext };
        appContextCopy.currentNote = props.id;
        setAppContext(appContextCopy);
    };
    return (
        <div
            id={`note-${props.id}`}
            className={`note ${props.selected ? "selected" : ""}`}
            onClick={openNote}>
            <h4 className="title">{props.title}</h4>
            <p className="content">
                {props.content}
            </p>
        </div>

    );
}
export default Note;
