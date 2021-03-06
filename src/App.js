// Importing react hooks
import { useContext, useEffect, useState } from 'react';

// Import AppContext context hook from index.js 
import { AppContext } from './index';

// Import components 
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import Workplace from './components/Workplace';

// Import data.json then store it inside AppContext
import data from './data.json';

// Import style.scss (already converted to CSS using node-sass)
import './style/style.scss';

// App component
function App() {
  const [appContext, setAppContext] = useState(
    {
      storedData: { ...data },
      currentNote: null,
      currentNoteSaved: true,
      filterMode: false,
      currentTag: null,
      sidebarOpened: true,
      darkTheme: false,
    }
  );

  const editContent = (content, index) => {
    let appContextCopy = { ...appContext };
    appContextCopy.storedData.notes[index].content = content;
    setAppContext(appContextCopy);
  }

  useEffect(() => {
    // Detects if the data changes
    // TODO: Add using onChange event

    // Add a border to opened note from note list
    if (appContext.currentNote !== null) {
      document.querySelector(`.note#note-${appContext.currentNote}`).classList.add("opened");
      return () => {
        document.querySelector(`.note#note-${appContext.currentNote}`).classList.remove("opened");
      };
    }
  });

  return (
    <div className="App" >
      <AppContext.Provider value={[appContext, setAppContext]}>
        <ActivityBar />
        <Sidebar />
        <Workplace currentNote={appContext.currentNote} />
      </AppContext.Provider>
    </div>

  );
}

export default App;
