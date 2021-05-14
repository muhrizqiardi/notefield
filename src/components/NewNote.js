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
        appContextCopy.storedData.push(
            {
                "id": appContext.storedData.length,
                "title": `New note ${appContext.storedData.length}`,
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
        appContextCopy.currentNote = appContext.storedData.length - 1;
        setAppContext(appContextCopy);

        // Open newly created note to workplace
        eventBus.dispatch("openNote", { noteId: appContextCopy.currentNote });
    };
    return (
        <div className="new-note" onClick={newNote}>
            <i class='bx bx-plus'></i>
        </div>
    );
}
export default NewNote;
