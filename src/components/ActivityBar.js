import { useContext } from "react";
import AppDataContext from "../context/AppContext";


function ActivityBar(props) {
    // const [appContext, setAppContext] = useContext(AppContext);
    const { appData, setAppData, storedNotes, setStoredNotes, loading }  = useContext(AppDataContext);
    const sidebarToggle = () => {
        const appDataCopy = {...appData} ;
        appDataCopy.sidebarOpened = !appData.sidebarOpened;
        setAppData(appDataCopy);
    }
    return (
        <div className="activity-bar" onClick={sidebarToggle}>
            <div className="activity-button">
                <i className="bx bx-menu" />
            </div>
        </div>
    );
}
export default ActivityBar;
