import { useContext, useEffect, useState } from 'react';
import AppDataContext from '../context/AppContext';

function SortButton(props) {
  const { setAppData, appData } = useContext(AppDataContext);


  const handleButton = () => {
    setAppData(appData => {
      const appDataCopy = { ...appData };
      appDataCopy.sortMenuOpened = true;
      return appDataCopy;
    })
  }
  return (
    <>
      <div className="sort-button" onClick={handleButton}>
        {appData.currentSort === 'ASC' ?
          <i class='bx bx-sort-up'></i>
          :
          <i class='bx bx-sort-down'></i>
        }
      </div>
    </>
  );
}
export default SortButton;
