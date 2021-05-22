import { useContext } from "react";
import AppDataContext from "../context/AppContext";


function ActivityBar(props) {
    // const [appContext, setAppContext] = useContext(AppContext);
    const { appData, setAppData, storedNotes, setStoredNotes, isMobile, loading } = useContext(AppDataContext);
    const sidebarToggle = () => {
        const appDataCopy = { ...appData };
        appDataCopy.sidebarOpened = !appData.sidebarOpened;
        setAppData(appDataCopy);
    }
    return (
        <div className="activity-bar">
            { !isMobile &&
                <div className="activity-button desktop-menu" onClick={sidebarToggle}>
                    <i className="bx bx-menu" />
                </div>
            }
            { isMobile &&
                <div className="activity-button mobile-back" onClick={sidebarToggle}>
                    <i class='bx bxs-chevron-left'></i>
                </div>
            }
            <div className="activity-button">
                <img src="/notefield-icon.svg" alt="notefield icon" width="60%" height="60%" />
            </div>
        </div>
    );
}
export default ActivityBar;
