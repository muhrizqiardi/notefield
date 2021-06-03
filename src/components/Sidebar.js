// Importing react hooks and context
import { useContext, useEffect, useState } from 'react';

// Importing AppContext from index
import AppDataContext from '../context/AppContext';

// Importing components
import NewNote from "./NewNote";
import Note from './Note';
import SortButton from './SortButton';

function Sidebar() {
    const { appData, setAppData, fetchNotes, storedNotes, loading } = useContext(AppDataContext);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [searchKeywords, setSearchKeywords] = useState("");

    useEffect(() => {
        window.addEventListener("resize", () => { setWindowHeight(window.innerHeight) });
    });
    const sidebarClosed = (appData.sidebarOpened ? {
        "height": windowHeight - 40,
        "animation": "sidebar-anim 0.2s cubic-bezier(.33,.37,0,.97)"
    } : {
        "transform": "translateX(-150%)",
        "position": "absolute",
        "width": "30vw",
        "height": windowHeight - 40,
        "left": "40px",
        "transition": "all 0.5s cubic-bezier(.33,.37,0,.97)"
    });

    // Handle hide/show sidebar 
    const sidebarHidden = (appData.sidebarOpened ? {} : {
        "display": "none"
    });

    const handleCloseTag = () => {
        setAppData(appData => {
            const appDataCopy = { ...appData };
            appDataCopy.currentTag = "";
            fetchNotes({ sort: "ASC", tag: "" });
            return appDataCopy;
        })
    }
    return (
        <div className="sidebar" style={sidebarHidden, sidebarClosed}>
            <div className="sidebar-title">
                {
                    appData.currentTag ?
                        <>
                            Tag: {appData.currentTag}
                            <div className="close-tag" onClick={handleCloseTag} style={{cursor: 'pointer'}}>
                                <i className='bx bxs-x-circle' style={{marginLeft: 10}}/>
                            </div>
                        </>
                        :
                        `All Notes`
                }
            </div>
            <div className="sidebar-content">
                <div className="note-list">
                    <div className="note-toolbar">
                        <input type="text" name="search" onChange={e => setSearchKeywords(e.target.value)} placeholder="Search notes..." id="note-search" />
                        <SortButton />
                        <NewNote />
                    </div>
                    {
                        !loading ?
                            (
                                searchKeywords === "" ?
                                    storedNotes.map((note) =>
                                        <Note
                                            id={note['_id']}
                                            title={note.title}
                                            content={`${note.content.substring(0, 200)}${note.content.length > 200 ? "..." : ""}`}
                                        />)
                                    :
                                    [...storedNotes].filter(note => note.title.toLowerCase().includes(searchKeywords.toLowerCase()) || note.tags.includes(searchKeywords.toLowerCase()) || note.content.toLowerCase().includes(searchKeywords.toLowerCase())).map((note) =>
                                        <Note
                                            id={note['_id']}
                                            title={note.title}
                                            content={`${note.content.substring(0, 200)}${note.content.length > 200 ? "..." : ""}`}
                                        />)

                            )
                            :
                            <div class="lds-facebook"><div></div><div></div><div></div></div>
                    }
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
