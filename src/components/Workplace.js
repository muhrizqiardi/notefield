// Import react for draft-js
import React, { useEffect } from "react";

// Import react hooks and context
import { useContext } from "react";
import { AppContext } from "../index";

// Import Draft-js for editor component
import { ContentState, Editor, EditorState } from "draft-js";
import 'draft-js/dist/Draft.css';

// Import Components
import Tag from "./Tag";
import eventBus from "../eventBus";

function Workplace(props) {
    const [appContext, setAppContext] = useContext(AppContext);

    // Handler to save a note (whether automatically or manually through save button)
    const saveNote = () => {
        let appContextCopy = { ...appContext };
        // Save content
        appContextCopy.storedData.notes[props.currentNote].content = contentEditorState.getCurrentContent().getPlainText('\u0001');

        // Save title
        appContextCopy.storedData.notes[props.currentNote].title = titleEditorState.getCurrentContent().getPlainText('\u0001');

        setAppContext(appContextCopy);
    };

    // Hooks for draft-js
    const [contentEditorState, setContentEditorState] = React.useState(
        () => {
            if (appContext.currentNote !== null) {
                EditorState.createWithContent(ContentState.createFromText(appContext.storedData.notes[props.currentNote].content));
            } else {
                return null;
            }
        }
    );
    const [titleEditorState, setTitleEditorState] = React.useState(
        () => {
            if (appContext.currentNote !== null) {
                EditorState.createWithContent(ContentState.createFromText(appContext.storedData.notes[props.currentNote].content));
            } else {
                return null;
            }
        }
    );

    useEffect(() => {
        eventBus.on("openNote", (data) => {
            setContentEditorState(() => EditorState.createWithContent(ContentState.createFromText(appContext.storedData.notes[data.noteId].content)));
            setTitleEditorState(() => EditorState.createWithContent(ContentState.createFromText(appContext.storedData.notes[data.noteId].title)));
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
                    <h1>
                        <Editor
                            placeholder="Enter a Title Here"
                            editorState={titleEditorState}
                            onChange={setTitleEditorState}
                            handleReturn={() => 'handled'} />
                    </h1>
                    <p id="editor-info">Edited by {appContext.storedData.notes[props.currentNote].author} at {new Date(appContext.storedData.notes[props.currentNote].date).toLocaleString()}</p>
                    <Editor editorState={contentEditorState} onChange={setContentEditorState} />
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
