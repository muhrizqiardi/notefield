// Import react for draft-js
import React, { useEffect, useState } from "react";
import useStateWithCallback from 'use-state-with-callback';

// Import react hooks and context
import { useContext } from "react";
import { AppContext } from "../index";

// Import Components
import Tag from "./Tag";
import eventBus from "../eventBus";

// Import Slate editor
import { Editor } from "slate-react";
import { Value } from "slate";


function Workplace(props) {
    const [appContext, setAppContext] = useContext(AppContext);

    // CSS styling for adjusting workplace width  
    const workplaceWidth = (appContext.sidebarOpened ? {
        'width': `${(document.body.clientWidth * 0.7) - 40}px`
    } : {
        'width': `${document.body.clientWidth - 40}px`
    });

    // Hook for editor
    const [contentEditorState, setContentEditorState] = useState();
    const [titleEditorState, setTitleEditorState] = useState();

    // Handler to save a note (whether automatically or manually through save button)
    const saveNote = () => {
    };

    eventBus.on("openNote", (data) => {
    })

    if (props.currentNote !== null) {
        return (
            <div className="workplace" style={workplaceWidth}>
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
                    </div>
                    <>
                        <input type="text" name="" id="editor-title" />
                        <p id="editor-info">Edited by {/*currentNoteData.author ||*/ "bebek"} at {/*new Date(currentNoteData.date).toLocaleString()*/}</p>
                        <Editor
                            placeholder="Enter a note here"
                            value={contentEditorState}
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
