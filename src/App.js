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
import FloatingSortMenu from './components/FloatingSortMenu';
import AddTagDialog from './components/AddTagDialog';

// App component
function App() {
  const { appData, setAppData, storedNotes, loading, isMobile,  handleResize } = useContext(AppDataContext);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => { handleResize(); setWindowHeight(window.innerHeight)});
  });


  return (
    <div className="App" >
      <ActivityBar />
      <div className="content-container" style={{height: `${windowHeight-40}px`}}>
        {appData.sortMenuOpened ? <FloatingSortMenu/> : <></>}
        <Sidebar />
        <Workplace currentNote={appData.currentNote} />
      </div>
    </div>
  );
}

export default App;
