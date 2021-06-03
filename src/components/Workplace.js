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
import ContentEditable from "react-contenteditable";
import AddTagDialog from "./AddTagDialog";

function Workplace(props) {
    const { appData, setAppData, storedNotes, setStoredNotes, addNote, editNote, deleteNote, isMobile, loading } = useContext(AppDataContext);
    const [contentState, setContentState] = useState("");
    const [titleState, setTitleState] = useState("");
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => { setWindowHeight(window.innerHeight); setWindowWidth(window.innerWidth) });
    });

    const openDialog = () => {
        setAppData(appData => {
            const appDataCopy = { ...appData };
            appDataCopy.addTagDialogOpened = true;
            return appDataCopy;
        })
    }


    // Handler to save a note (whether automatically [WIP] or manually through save button)
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
            <div className="workplace" style={{ width: (isMobile ? windowWidth : (appData.sidebarOpened ? windowWidth - (windowWidth * 0.3) : windowWidth)), height: windowHeight - 40 }}>
                {appData.addTagDialogOpened && appData.currentNote ? <AddTagDialog titleState={titleState} contentState={contentState} /> : <></>}
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
                        <div className="tag new" onClick={openDialog}>
                            +
                        </div>
                        {storedNotes.find(note => note["_id"] === appData.currentNote).tags.length > 0 ? storedNotes.find(note => note["_id"] === appData.currentNote).tags.map((tag) => {
                            return (
                                <Tag titleState={titleState} contentState={contentState} >
                                    {tag}
                                </Tag>
                            )
                        })
                            :
                            <div style={{marginLeft: 10, fontSize: 10, height: "100%"}}>
                            Click "+" to add a new tag
                            </div>
                        }
                    </div>
                    <input placeholder="Enter a title here..." type="text" id="editor-title" onChange={(e) => setTitleState(e.target.value)} value={titleState} />
                    {/* <ContentEditable
                        html={titleState}
                        tagName="h1"
                        onChange={(e) => setTitleState(e.target.value)}
                    /> */}
                    <p id="editor-info">Edited by {storedNotes.find(note => note["_id"] === appData.currentNote).author} at {new Date(storedNotes.find(note => note["_id"] === appData.currentNote).updatedAt).toLocaleString()}</p>
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
            <div className="workplace-empty" style={{ width: (isMobile ? windowWidth : (appData.sidebarOpened ? windowWidth - (windowWidth * 0.3) : windowWidth)), height: windowHeight - 40 }}>
                Select a note, or create a new note to start editing.
            </div>);
    }

}
export default Workplace;
