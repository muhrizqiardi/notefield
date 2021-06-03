import { useContext, useState } from 'react';
import AppDataContext from '../context/AppContext';


function AddTagDialog(props) {
  const { appData, setAppData, storedNotes, setStoredNotes, editNote} = useContext(AppDataContext);
  const [tagName, setTagName] = useState("")
  const editTagAndSaveNote = () => {
    let storedNotesCopy = [...storedNotes];
    // Save content
    storedNotesCopy.find(note => note["_id"] === appData.currentNote).title = props.titleState;

    // Save title
    storedNotesCopy.find(note => note["_id"] === appData.currentNote).content = props.contentState;

    // Save new tag
    storedNotesCopy.find(note => note["_id"] === appData.currentNote).tags.push(tagName);

    setStoredNotes(storedNotesCopy);
    editNote(storedNotesCopy.find(note => note["_id"] === appData.currentNote));
    closeDialog();
  }

  const closeDialog = () => {
    setAppData(appData=> {
      const appDataCopy = {...appData};
      appDataCopy.addTagDialogOpened = false;
      return appDataCopy;
    })
  }

  return (
    <div className="background" style={styles.background}>
      <div className="AddTagDialog" style={styles.dialog}>
        <div>New tag</div>
        <input type="text" onChange={e => setTagName(e.target.value)} name="tag name" style={styles.input} />
        <div style={styles.btn} onClick={editTagAndSaveNote}>Confirm</div>
        <div style={styles.btnCancel} onClick={closeDialog}>Cancel</div>
      </div>
    </div>
  );
}

const styles = {
  background: {
    zIndex: 7,
    position: "fixed",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dialog: {
    minWidth: 300,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 30,
    marginTop: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    animation: "slidein 0.5s"
  },
  input: {
    width: "100%",
    margin: "20px 0",
    backgroundColor: "rgba(189, 189, 189, 0.3)",
    borderRadius: 10,
    padding: 15,
    border: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  btn: {
    width: "100%",
    textAlign: "center",
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "rgba(0,0,255,0.1)",
    borderRadius: 10,
    cursor: "pointer"
  },
  btnCancel: {
    width: "100%",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "rgba(255,0,0,0.1)",
    borderRadius: 10,
    cursor: "pointer"
  },

}

export default AddTagDialog;
