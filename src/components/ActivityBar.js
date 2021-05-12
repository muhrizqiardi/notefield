import { useContext } from "react";
import { AppContext } from "../index";


function ActivityBar(props) {
    const [appContext, setAppContext] = useContext(AppContext);
    const sidebarToggle = () => {
        const appContextCopy = {...appContext} ;
        appContextCopy.sidebarOpened = !appContext.sidebarOpened;
        setAppContext(appContextCopy);
    }
    return (
        <div className="activity-bar" onClick={sidebarToggle}>
            <div className="activity-button">
                <i className="bx bx-menu" />
            </div>
            <div className="activity-button">
                <i className="bx bx-search" />
            </div>
            <div className="activity-button">
                <i className="bx bx-sync" />
            </div>
        </div>
    );
}
export default ActivityBar;
