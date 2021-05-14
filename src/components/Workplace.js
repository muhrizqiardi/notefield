// Import react for draft-js
import React, { useEffect, useState } from "react";
import useStateWithCallback from 'use-state-with-callback';

// Import react hooks and context
import { useContext } from "react";
import { AppContext } from "../index";

// Import Draft-js for editor component
import { ContentState, Editor, EditorState } from "draft-js";
import 'draft-js/dist/Draft.css';

// Import Components
import Tag from "./Tag";
import eventBus from "../eventBus";

// For fetching from API
import axios from "axios";



function Workplace(props) {
    const [appContext, setAppContext] = useContext(AppContext);

    // CSS styling for adjusting workplace width  
    const workplaceWidth = (appContext.sidebarOpened ? {
        'width': `${(document.body.clientWidth * 0.7) - 40}px`
    } : {
        'width': `${document.body.clientWidth - 40}px`
    });

    // Hook to store title & content and others
    const [currentNoteData, setCurrentNoteData] = useStateWithCallback(null, (currentNoteData) => {
        if (currentNoteData) {
            setContentEditorState(() => { EditorState.createWithContent(ContentState.createFromText(currentNoteData.content, "\n")) });
            setTitleEditorState(() => { EditorState.createWithContent(ContentState.createFromText(currentNoteData.title, "\n")) });
        }
    });

    // Hook for draft-js
    const [contentEditorState, setContentEditorState] = useState();
    const [titleEditorState, setTitleEditorState] = useState();

    // Handler to save a note (whether automatically or manually through save button)
    const saveNote = () => {
        let appContextCopy = { ...appContext };
        // Save content
        appContextCopy.storedData[props.currentNote].content = contentEditorState.getCurrentContent().getPlainText('\u0001');

        // Save title
        appContextCopy.storedData[props.currentNote].title = titleEditorState.getCurrentContent().getPlainText('\u0001');

        // Update date
        appContextCopy.storedData[props.currentNote].date = new Date().getTime();

        setAppContext(appContextCopy);
    };

    eventBus.on("openNote", (data) => {
        setCurrentNoteData(appContext.storedData.find(note => note["_id"] == data.noteId));
    })

    useEffect(() => {
        if (currentNoteData) {
            console.log(currentNoteData)
        }
    }, [currentNoteData]);

    if (props.currentNote !== null) {
        return (
            <div action="/api/post" method="POST" className="workplace" style={workplaceWidth}>
                <div className="editor-toolbar">
                    <button className="toolbar-button active">
                        <i className="bx bx-bold" />
                    </button>
                    <button className="toolbar-button">
                        <i className="bx bx-italic" />
                    </button>
                    <button className="toolbar-button">
                        <i className="bx bx-strikethrough" />
                    </button>
                    <button className="toolbar-button">
                        <i className="bx bx-code-alt" />
                    </button>
                    <button className="toolbar-button">
                        <i className="bx bxl-markdown" />
                    </button>
                    <div className="toolbar-divider">

                    </div>
                    <button className="toolbar-button" onClick={saveNote}>
                        <i className="bx bx-save" />
                    </button>
                </div>
                <div className="editor">
                    <div className="tags">
                        <Tag>+</Tag>
                        {currentNoteData && currentNoteData.tags.map((tag) => {
                            return (
                                <Tag>
                                    {tag}
                                </Tag>
                            )
                        })}
                    </div>
                    <>
                        <h1>
                            <Editor
                                placeholder="Enter a Title Here"
                                editorState={titleEditorState}
                                onChange={setTitleEditorState}
                                handleReturn={() => 'handled'} />
                        </h1>
                        <p id="editor-info">Edited by {currentNoteData.author} at {new Date(currentNoteData.date).toLocaleString()}</p>
                        <Editor
                            placeholder="Enter a note here"
                            editorState={contentEditorState}
                            onChange={setContentEditorState} />
                    </>
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
