// Importing hooks and context
import { useContext } from "react";
import { AppContext } from '../index';

// Importing eventBus
import eventBus from "../eventBus"

function NewNote(props) {
    const [appContext, setAppContext] = useContext(AppContext);
    const newNote = () => {
        let appContextCopy = { ...appContext };

        // Add/push a new note to the array
        appContextCopy.storedData.notes.push(
            {
                "id": appContext.storedData.notes.length,
                "title": `New note ${appContext.storedData.notes.length}`,
                "tags": [
                    "placeholder"
                ],
                "content": "Placeholder",
                "date": new Date().getTime(),
                "author": "Muhammad Rizqi Ardiansyah"
            }
        );
        
        // Set current note as the newest note 
        // (subtracted by one because length of an array is always bigger) 
        appContextCopy.currentNote = appContext.storedData.notes.length - 1;
        setAppContext(appContextCopy);

        // Open newly created note to workplace
        eventBus.dispatch("openNote", { noteId: appContextCopy.currentNote })
        document.querySelector(`#note-${appContext.currentNote}`).scrollIntoView();
    };
    return (
        <div className="new-note" onClick={newNote}>
            + New Note
        </div>
    );
}
export default NewNote;
