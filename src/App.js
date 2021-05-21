// Importing react hooks
import { useContext, useEffect, useState } from 'react';

// Import AppContext context hook from index.js 
import AppDataContext from './context/AppContext';

// Import components 
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import Workplace from './components/Workplace';

// Import data.json then store it inside AppContext
// import data from './data.json';

// Import style.scss (already converted to CSS using node-sass)
import './style/style.scss';

// App component
function App() {
  // const [appContext, setAppContext] = useState(
  //   {
  //     storedData: { ...data },
  //     currentNote: null,
  //     currentNoteSaved: true,
  //     filterMode: false,
  //     currentTag: null,
  //     sidebarOpened: true,
  //     darkTheme: false,
  //   }
  // );
  const { appData, setAppData, storedNotes, loading } = useContext(AppDataContext);

  return (
    <div className="App" >
      <ActivityBar />
      <Sidebar />
      <Workplace currentNote={appData.currentNote} />
    </div>
  );
}

export default App;
