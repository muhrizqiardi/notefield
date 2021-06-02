import { useContext, useEffect, useState } from 'react';
import AppDataContext from '../context/AppContext';

export default function FloatingSortMenu(props) {
  const { appData, setAppData, fetchNotes } = useContext(AppDataContext);
  const handleChangeSort = (sort) => {
    console.log(sort)
    setAppData(appData => {
      const appDataCopy = {...appData};
      if (sort.length > 2) {
        appDataCopy.currentSort = sort;
      }
      appDataCopy.sortMenuOpened = false;
      return appDataCopy;
    })
    fetchNotes(sort)
  }
  return (
    <div
      className="floating-menu-bg"
      style={{
        zIndex: 7,
        position: "fixed",
        top: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div 
        style={{
          minHeight: 300,
          minWidth: 300,
          backgroundColor: "white",
          borderRadius: 30,
          padding: 30,
          display:"flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}>
          <h4>Sort: </h4>
          <div 
          onClick={() => handleChangeSort("ASC")}
          style={{
            margin: "10px 0",
            padding: "10px",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: 10,
            cursor: "pointer"
          }}>Ascending
          </div>
          <div 
          onClick={() => handleChangeSort("DESC")}
          style={{
            margin: "5px 0",
            padding: "10px",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: 10,
            cursor: "pointer"
          }}>Descending
          </div>
          <div 
            onClick={() => handleChangeSort("")}
            style={{
            width: "100%",
            textAlign: "center",
            marginTop: "30px",
            padding: "10px",
            backgroundColor: "rgba(255,0,0,0.1)",
            borderRadius: 10,
            cursor: "pointer"
          }}>Close
          </div>
        </div>
    </div>
  );
}
