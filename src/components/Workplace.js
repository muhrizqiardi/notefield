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

function Workplace(props) {
    const [appContext, setAppContext] = useContext(AppContext);
    const [contentState, setContentState] = useState("");
    const [titleState, setTitleState] = useState("");

    // Handler to save a note (whether automatically or manually through save button)
    const saveNote = () => {
        let appContextCopy = { ...appContext };
        // Save content
        appContextCopy.storedData.notes[appContextCopy.currentNote].title = titleState;

        // Save title
        appContextCopy.storedData.notes[appContextCopy.currentNote].content = contentState;

        setAppContext(appContextCopy);
    };

    // Hooks for draft-js

    useEffect(() => {
        eventBus.on("openNote", (data) => {
            setTitleState(appContext.storedData.notes[data.noteId].title)
            setContentState(appContext.storedData.notes[data.noteId].content)
        });
    });

    if (appContext.currentNote !== null) {
        return (
            <div className="workplace">
                <div className="editor-toolbar">
                    <div className="toolbar-button active">
                        <i className="bx bx-bold" />
                    </div>
                    <div className="toolbar-button">
                        <i className="bx bx-italic" />
                    </div>
                    <div className="toolbar-button">
                        <i className="bx bx-strikethrough" />
                    </div>
                    <div className="toolbar-button">
                        <i className="bx bx-code-alt" />
                    </div>
                    <div className="toolbar-button">
                        <i className="bx bxl-markdown" />
                    </div>
                    <div className="toolbar-divider">

                    </div>
                    <div className="toolbar-button" onClick={saveNote}>
                        <i className="bx bx-save" />
                    </div>
                </div>
                <div className="editor">
                    <div className="tags">
                        <Tag>+</Tag>
                        {appContext.storedData.notes[props.currentNote].tags.map((tag) => {
                            return (
                                <Tag>
                                    {tag}
                                </Tag>
                            )
                        })}
                    </div>
                    <input type="text" id="editor-title" onChange={(e) => setTitleState(e.target.value)} value={titleState} />
                    <p id="editor-info">Edited by {appContext.storedData.notes[props.currentNote].author} at {new Date(appContext.storedData.notes[props.currentNote].date).toLocaleString()}</p>
                    <ReactQuill
                        theme="bubble"
                        value={contentState}
                        onChange={setContentState}
                        style={{ minHeight: '300px', width: '100%', fontFamily: 'Inter' }}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="workplace-empty">
                Select a note, or create a new note to start editing.
            </div>);
    }

}
export default Workplace;
