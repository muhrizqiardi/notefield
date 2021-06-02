import { useContext } from "react";

import AppDataContext from "../context/AppContext";


function Tag({ children }) {
    const { appData, setAppData, fetchNotes } = useContext(AppDataContext);
    const handleSelectTag = () => {
      setAppData(appData => {
          const appDataCopy = {...appData};
          appDataCopy.currentTag = children;
          fetchNotes({sort: "ASC", tag: children});
          return appDataCopy;
      })
    }
    return (
        <div className="tag" onClick={handleSelectTag}>
            {children}
        </div>
    );
}
export default Tag;
