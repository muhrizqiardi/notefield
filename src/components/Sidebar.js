// Importing react hooks and context
import { useContext, useEffect, useState } from 'react';

// Importing AppContext from index
import { AppContext } from "..";

// Importing components
import NewNote from "./NewNote";
import Note from './Note';

function Sidebar() {
    const [appContext, setAppContext] = useContext(AppContext);
    const [noteList, setNoteList] = useState({ ...appContext.storedData });

    // Handle hide/show sidebar 
    const sidebarHidden = (appContext.sidebarOpened ? {} : {
        "display": "none"
    });

    return (
        <div className="sidebar" style={sidebarHidden}>
            <div className="sidebar-title">
                All Notes
                </div>
            <div className="sidebar-content">
                <div className="note-list">
                    <NewNote />
                    {noteList.notes.reverse().map((note) =>
                        <Note
                            id={note.id}
                            title={note.title}
                            content={`${note.content.substring(0, 200)}${note.content.length > 200 ? "..." : ""}`}
                            selected={false} />
                    )}
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
