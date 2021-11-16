import './App.css';

import Desks from "./components/Desks/Desks";
import Navbar from "./components/Navbar";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import DesksList from "./components/DesksList";
import Main from "./components/Main";
import Cards from "./components/Cards";
import Tasks from "./components/Tasks";
import Auth from "./components/Auth";
import {useEffect, useState} from "react";

function App() {
  const [apiToken, setToken] = useState('');
  const [user, setUser] = useState();
  const [config, setConfig] = useState({
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('apiToken')
    }
  });

  const selectConfig = () => {
    setConfig({
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('apiToken')
      }
    });
  }

  const selectToken = (token) => {
    setToken(token);
    localStorage.setItem('apiToken', token);
    selectConfig();
  }

  const checkedTicket = () => {
    const token = localStorage.getItem('apiToken');
    if (token && token !== 'null') {
      selectToken(token);
    }
  }

  useEffect(() => {
    checkedTicket();
  }, [apiToken])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar token={apiToken}/>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/desks" element={<Desks token={apiToken} config={config}/>}/>
            <Route path="/desks-list" element={<DesksList/>}/>
            <Route path="/cards" element={<Cards/>}/>
            <Route path="/tasks" element={<Tasks/>}/>
            <Route path="/auth" element={<Auth token={apiToken} selectToken={selectToken}/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
