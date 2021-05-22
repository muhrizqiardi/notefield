// Importing react hooks and context
import { useContext, useEffect, useState } from 'react';

// Importing AppContext from index
import AppDataContext from '../context/AppContext';

// Importing components
import NewNote from "./NewNote";
import Note from './Note';

function Sidebar() {
    const { appData, storedNotes, loading } = useContext(AppDataContext);

    const sidebarClosed = (appData.sidebarOpened ? {} : {
        "transform": "translateX(-120%)",
        "position": "absolute",
        "width": "30vw",
        "left": "40px",
        "transition": "transform 0.5s"
    });

    // Handle hide/show sidebar 
    const sidebarHidden = (appData.sidebarOpened ? {} : {
        "display": "none"
    });
    return (
        <div className="sidebar" style={sidebarHidden, sidebarClosed}>
            <div className="sidebar-title">
                All Notes
                </div>
            <div className="sidebar-content">
                <div className="note-list">
                    <NewNote />
                    {!loading ? storedNotes.map((note) =>
                        <Note
                            id={note['_id']}
                            title={note.title}
                            content={`${note.content.substring(0, 200)}${note.content.length > 200 ? "..." : ""}`}
                        />)
                        :
                        <div class="lds-facebook"><div></div><div></div><div></div></div>}
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
