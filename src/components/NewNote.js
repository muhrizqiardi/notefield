// Importing hooks and context
import { useContext } from "react";
import { AppContext } from '../index';

// Importing eventBus
import eventBus from "../eventBus"
import AppDataContext from "../context/AppContext";

function NewNote(props) {
    // const [appContext, setAppContext] = useContext(AppContext);
    const { appData, setAppData, fetchNotes, storedNotes, setStoredNotes, addNote, loading } = useContext(AppDataContext);
    const newNote = async () => {
        let appDataCopy = {...appData};

        // Add a note on the back-end
        let addedNote = await addNote({
            "title": `New note ${storedNotes.length}`,
            "tags": [
                "placeholder"
            ],
            "content": "Placeholder",
            "date": new Date().getTime(),
            "author": "Muhammad Rizqi Ardiansyah"
        });
        addedNote = JSON.parse(addedNote);

        // Fetch note from back-end
        fetchNotes();

        // Open the new note on the front-end
        setAppData(appData => {
            appData.currentNote = addedNote["_id"];
            return appData;
        });

        // // Set current note as the newest note 
        // // (subtracted by one because length of an array is always bigger) 
        // appDataCopy.currentNote = storedNotes.length - 1;
        // setStoredNotes(storedNotesCopy);
        // setAppData(appDataCopy);
        // // addNote(storedNotesCopy.find(note => note["_id"] === appData.currentNote));
        // // fetchStoredNotes();
        // console.log(storedNotes);
    };
    return (
        <div className="new-note" onClick={newNote}>
            + New Note
        </div>
    );
}
export default NewNote;
