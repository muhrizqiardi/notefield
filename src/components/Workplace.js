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

function Workplace(props) {
    const [appContext, setAppContext] = useContext(AppContext);

    const saveContent = () => {
        let appContextCopy = { ...appContext };
        appContextCopy.storedData.notes[props.currentNote].content = document.querySelector("#editor-content").innerHTML;
        setAppContext(appContextCopy);
    };

    const renderSavedStatus = () => {
        return (
            <div className="toolbar-saved-status">
                {(<i className="bx bx-check" />)}
            </div>
        )
    };

    // Hooks for draft-js
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithContent(ContentState.createFromText(appContext.storedData.notes[props.currentNote].content))
    );

    useEffect(() => {
        setEditorState(EditorState.createWithContent(ContentState.createFromText(appContext.storedData.notes[props.currentNote].content)));
    }, props.id);

    return (
        <div className="workplace">
            <div className="editor-toolbar">
                <div className="toolbar-button active" onClick={() => { console.log("current Note = " + props.currentNote) }}>
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
                <div className="toolbar-button" onClick={saveContent}>
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
                <h1 id="editor-title" placeholder="Title Here" contentEditable>{appContext.storedData.notes[props.currentNote].title}</h1>
                <p id="editor-info">Edited by {appContext.storedData.notes[props.currentNote].author} at {new Date(appContext.storedData.notes[props.currentNote].date).toLocaleString()}</p>
                <Editor id="editor-content" editorState={editorState} onChange={setEditorState}>
                    {appContext.storedData.notes[props.currentNote].content}
                </Editor>
                {/* <div id="editor-content" placeholder="Enter text here..." contentEditable>
                    {appContext.storedData.notes[props.currentNote].content}
                </div> */}
            </div>
        </div>

    );
}
export default Workplace;
