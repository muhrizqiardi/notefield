// Importing react hooks
import { useContext, useEffect, useState } from 'react';

// Import AppContext context hook from index.js 
import AppDataContext from './context/AppContext';

// Import components 
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import Workplace from './components/Workplace';

// Import style.scss (already converted to CSS using node-sass)
import './style/style.scss';

// App component
function App() {
  const { appData, setAppData, storedNotes, loading, isMobile,  handleResize } = useContext(AppDataContext);

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  });

  return (
    <div className="App" >
      <ActivityBar />
      <div className="content-container">
        <Sidebar />
        <Workplace currentNote={appData.currentNote} />
      </div>
    </div>
  );
}

export default App;
