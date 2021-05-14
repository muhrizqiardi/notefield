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
    const sidebarClosed = (appContext.sidebarOpened ? {} : {
        "transform": "translateX(-120%)",
        "position": "absolute",
        "width": "30vw",
        "left": "40px"
    });

    const handleSearchButton = () => {
        setNoteList({ ...appContext.storedData });

        if (document.querySelector("input.search").value) {
            setNoteList(() => {
                let noteListCopy = { ...noteList };
                noteListCopy = noteListCopy.filter(notes => (notes.content.includes(document.querySelector("input.search").value) || notes.title.includes(document.querySelector("input.search").value)));
                return (noteListCopy);
            })
        }
    };

    const handleClearSearchButton = () => {
        setNoteList({ ...appContext.storedData });
        document.querySelector("input.search").value = "";
    };

    return (
        <div className="sidebar" style={sidebarClosed}>
            <div className="sidebar-title">
                All Notes
                </div>
            <div className="sidebar-content">
                <div className="note-list">
                    <div className="toolbar">
                        <input type="text" placeholder="Search notes" className="search" />
                        <button className="clear-search-button" onClick={handleClearSearchButton}>
                            <i className='bx bx-x-circle'></i>
                        </button>
                        <button className="search-button" onClick={handleSearchButton}>
                            <i className='bx bx-search'></i>
                        </button>
                        <button className="sort-button">
                            <i className='bx bx-sort'></i>
                        </button>
                        <NewNote />
                    </div>
                    {   appContext.storedData && 
                        appContext.storedData.map((note) =>
                            <Note
                                id={note['_id']}
                                title={note.title}
                                content={note.content}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
