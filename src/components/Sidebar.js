// Importing react hooks and context
import { useContext, useEffect, useState } from 'react';

// Importing AppContext from index
import AppDataContext from '../context/AppContext';

// Importing components
import NewNote from "./NewNote";
import Note from './Note';

function Sidebar() {
    // const [appContext, setAppContext] = useContext(AppContext);
    // const [noteList, setNoteList] = useState({ ...appContext.storedData });

    const {appData, storedNotes, loading} = useContext(AppDataContext);

    // Handle hide/show sidebar 
    const sidebarHidden = (appData.sidebarOpened ? {} : {
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
                    {storedNotes && storedNotes.map((note) =>
                        <Note
                            id={note['_id']}
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
