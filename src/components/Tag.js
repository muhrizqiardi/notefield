import { useContext } from "react";

import AppDataContext from "../context/AppContext";


function Tag(props) {
    const { appData, setAppData, storedNotes, setStoredNotes, editNote, fetchNotes } = useContext(AppDataContext);
    const handleSelectTag = () => {
        setAppData(appData => {
            const appDataCopy = { ...appData };
            appDataCopy.currentTag = props.children;
            fetchNotes({ sort: "ASC", tag: props.children });
            return appDataCopy;
        })
    }
    const handleDeleteTag = () => {
        let storedNotesCopy = [...storedNotes];
        // Save content
        storedNotesCopy.find(note => note["_id"] === appData.currentNote).title = props.titleState;

        // Save title
        storedNotesCopy.find(note => note["_id"] === appData.currentNote).content = props.contentState;

        // Save new tag
        storedNotesCopy.find(note => note["_id"] === appData.currentNote).tags = storedNotesCopy.find(note => note["_id"] === appData.currentNote).tags.filter(tag => tag !== props.children);
        console.log(storedNotesCopy.find(note => note["_id"] === appData.currentNote).tags);
        console.log(storedNotesCopy.find(note => note["_id"] === appData.currentNote).tags.filter(tag => tag !== props.children));

        setStoredNotes(storedNotesCopy);
        editNote(storedNotesCopy.find(note => note["_id"] === appData.currentNote));

    }
    return (
        <>
            <div className="tag">
                <div onClick={handleSelectTag}>{props.children}</div>
            </div>
            <i onClick={handleDeleteTag} className="tag-delete bx bx-x" />
        </>
    );
}
export default Tag;
