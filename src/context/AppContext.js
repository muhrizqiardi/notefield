import { createContext, useState, useEffect } from "react";
import {API_URL} from "../utils/urls"

const AppDataContext = createContext();

export const AppDataProvider = (props) => {
  const [appData, setAppData] = useState(
    {
      currentNote: null,
      currentTag: null,
      sidebarOpened: true,
    }
  );
  const [storedNotes, setStoredNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch from notes API to store it to storedNotes
  const fetchStoredNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/notes`);
      const data = res.json();
      setStoredNotes(data);
    } catch (error) {
      setStoredNotes([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchStoredNotes();
  }, [storedNotes]);
  
  return (
    <AppDataContext.Provider value={{ appData, setAppData, setStoredNotes, storedNotes, loading }}>
      {props.children}
    </AppDataContext.Provider>
  ); 
}

export default AppDataContext;