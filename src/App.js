// Importing react hooks
import { useContext, useEffect, useState } from 'react';

// Import AppContext context hook from index.js 
import { AppContext } from './index';

// Import components 
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import Workplace from './components/Workplace';

// Import axios
import axios from 'axios';

// Import data.json then store it inside AppContext
// import data from './data.json';

// Import style.scss (already converted to CSS using node-sass)
import './style/style.scss';
import { getFromAPI } from './getFromAPI';

// App component
function App() {
  const [appContext, setAppContext] = useState(
    {
      storedData: [],
      currentNote: null,
      currentNoteSaved: true,
      filterMode: false,
      currentTag: null,
      sidebarOpened: true,
      isMobile: (document.body.clientWidth < 500),
      darkTheme: false,
    }
  );

  useEffect(() => {
    axios.get("http://localhost:3001/api/all")
      .then((response) => {
        setAppContext(() => {
          let appContextCopy = { ...appContext };
          appContextCopy.storedData = response.data;
          return appContextCopy;
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  useEffect(() => {
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
