import { useContext } from "react";
import AppDataContext from '../context/AppContext';
import MultiClamp from 'react-multi-clamp';

import eventBus from "../eventBus";

function Note(props) {
    const {appData, setAppData, storedNotes, loading, isMobile} = useContext(AppDataContext);

    const openNote = () => {
        let appDataCopy = { ...appData };
        appDataCopy.currentNote = props.id;
        if (isMobile) {
            console.log(isMobile)
            appDataCopy.sidebarOpened = false;
            console.log(appDataCopy.sidebarOpened)
        } 
        setAppData(appDataCopy);
    };

    return (
        <div
            id={`note-${props.id}`}
            className={`note ${props.id === appData.currentNote ? "selected" : ""}`}
            onClick={openNote}>
            <h4 className="title">{props.title}</h4>
            <MultiClamp ellipsis="..." clamp={5}>
                <div className="content" dangerouslySetInnerHTML={{ __html: props.content }}>
                </div>
            </MultiClamp>
        </div>

    );
}
export default Note;
