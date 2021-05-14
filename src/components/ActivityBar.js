import { useContext } from "react";
import { AppContext } from "../index";

function ActivityBar(props) {
    const [appContext, setAppContext] = useContext(AppContext);
    const sidebarTogglerHandler = () => {
        const appContextCopy = { ...appContext };
        appContextCopy.sidebarOpened = !appContext.sidebarOpened;
        setAppContext(appContextCopy);
    }
    return (
        <div className="activity-bar" >
            <button className="activity-button" onClick={sidebarTogglerHandler}>
                <i className="bx bx-menu" />
            </button>
            <button className="activity-button">
                <i className="bx bx-sync" />
            </button>
        </div>
    );
}
export default ActivityBar;
