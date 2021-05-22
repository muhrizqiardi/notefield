import { createContext, useState, useEffect } from "react";
import { API_URL } from "../utils/urls"

const AppDataContext = createContext();


export const AppDataProvider = (props) => {
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  const [appData, setAppData] = useState(
    {
      currentNote: null,
      currentTag: null,
      sidebarOpened: true,
    }
  );
  const [isMobile, setIsMobile] = useState(() => (window.innerWidth < 720))
  const [storedNotes, setStoredNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch from notes API to store it to storedNotes
  const fetchNotes = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/notes`);
      const data = await res.json();
      setStoredNotes(data);
      console.log(data)

    } catch (error) {

      setStoredNotes([]);

    }

    setLoading(false);
  }

  // Add a new note
  const addNote = async (note) => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(note);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    var res = fetch(`${API_URL}/notes`, requestOptions)
      .then(response => response.text())
      .then(data => data)
      .catch(error => console.log('error', error));    

    setLoading(false);
    return res;
  }

  // Edit an existing note
  const editNote = async (note) => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(note);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${API_URL}/notes`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setLoading(false);
  }
  
  // Delete a selected note
  const deleteNote = async (note) => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(note);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${API_URL}/notes`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setLoading(false);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        appData,
        setAppData,
        fetchNotes,
        setStoredNotes,
        storedNotes,
        addNote,
        editNote,
        deleteNote,
        handleResize,
        isMobile,
        setIsMobile,
        loading
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
}

export default AppDataContext;