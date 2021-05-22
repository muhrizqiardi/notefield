// Import react for draft-js
import React, { useEffect, useState } from "react";

// Import react hooks and context
import { useContext } from "react";
import { AppContext } from "../index";

// Import Components
import Tag from "./Tag";
import eventBus from "../eventBus";

// Import quill-js for the editor
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import AppDataContext from "../context/AppContext";

function Workplace(props) {
    const { appData, setAppData, storedNotes, setStoredNotes, addNote, editNote, deleteNote, loading } = useContext(AppDataContext);
    const [contentState, setContentState] = useState("");
    const [titleState, setTitleState] = useState("");

    // Styles to set the width of Workplace to proper width
    const workplaceWidth = (appData.sidebarOpened ? {
        'width': `100%`
    } : {
        'width': `${document.body.clientWidth - 40}px`
    });

    // Handler to save a note (whether automatically or manually through save button)
    const handleSaveNote = () => {
        let storedNotesCopy = [...storedNotes];
        // Save content
        storedNotesCopy.find(note => note["_id"] === appData.currentNote).title = titleState;

        // Save title
        storedNotesCopy.find(note => note["_id"] === appData.currentNote).content = contentState;

        setStoredNotes(storedNotesCopy);
        editNote(storedNotesCopy.find(note => note["_id"] === appData.currentNote));
    };

    const handleDeleteNote = () => {
        // Delete on front-end
        let storedNotesCopy = [...storedNotes];
        deleteNote(storedNotesCopy.find(note => note["_id"] === appData.currentNote)); // Delete on back-end (make a DELETE request)
        storedNotesCopy = storedNotesCopy.filter(note => note["_id"] !== appData.currentNote);
        setAppData(appData => {
            appData.currentNote = null;
            return appData;
        }); // Set the currentNote to null
        setStoredNotes(storedNotesCopy);
    }

    // Hooks for react-quill
    useEffect(() => {
        appData.currentNote && setTitleState(storedNotes.find(note => note["_id"] === appData.currentNote).title)
        appData.currentNote && setContentState(storedNotes.find(note => note["_id"] === appData.currentNote).content)
        console.log(storedNotes.find(note => note["_id"] === appData.currentNote));
    }, [appData.currentNote]);

    if (appData.currentNote !== null) {
        return (
            <div className="workplace" style={workplaceWidth}>
                <div className="editor-toolbar">
                    <div className="toolbar-button" onClick={handleSaveNote}>
                        <i className="bx bx-save" />
                    </div>
                    <div className="toolbar-button" onClick={handleDeleteNote}>
                        <i class='bx bxs-trash'></i>
                    </div>
                </div>
                <div className="editor">
                    <div className="tags">
                        <Tag>+</Tag>
                        {storedNotes.find(note => note["_id"] === appData.currentNote).tags && storedNotes.find(note => note["_id"] === appData.currentNote).tags.map((tag) => {
                            return (
                                <Tag>
                                    {tag}
                                </Tag>
                            )
                        })}
                    </div>
                    <input type="text" id="editor-title" onChange={(e) => setTitleState(e.target.value)} value={titleState} />
                    <p id="editor-info">Edited by {storedNotes.find(note => note["_id"] === appData.currentNote).author} at {new Date(storedNotes.find(note => note["_id"] === appData.currentNote).date).toLocaleString()}</p>
                    <ReactQuill
                        theme="bubble"
                        id="editor-content"
                        value={contentState}
                        onChange={setContentState}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="workplace-empty" style={workplaceWidth}>
                Select a note, or create a new note to start editing.
            </div>);
    }

}
export default Workplace;
