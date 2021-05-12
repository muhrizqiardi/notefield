// Importing hooks and context
import { useContext } from "react";
import { AppContext } from '../index';

function NewNote(props) {
    const [appContext, setAppContext] = useContext(AppContext);
    const newNote = () => {
        let appContextCopy = { ...appContext };

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

        appContextCopy.currentNote = appContext.storedData.notes.length - 1;
        setAppContext(appContextCopy);
        document.querySelector(`#note-${appContext.currentNote}`).scrollIntoView();
    };
    return (
        <div className="new-note" onClick={newNote}>
            + New Note
        </div>
    );
}
export default NewNote;
