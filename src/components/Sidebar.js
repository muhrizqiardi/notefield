import { useContext, useEffect, useState } from 'react';

import { AppContext } from "..";

import NewNote from "./NewNote";

function Sidebar({ children }) {
    const [appContext, setAppContext] = useContext(AppContext);

    if (appContext.sidebarOpened) {
    }

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
                        {children}
                    </div>
                </div>
            </div>
        );
}
export default Sidebar;
