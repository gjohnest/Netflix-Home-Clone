import React from 'react'
import NavBar from './Components/navbar/NavBar';
import {action,originals} from './urls'
import './Components/navbar/App.css';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
function App() {
  return (
    <div>
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title='Netflix Originals'/>
      <RowPost url={action} title= 'Action' isSmall={true} />

    </div>
  );
}

export default App;
