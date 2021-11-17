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
import axios from "axios";
import TestComponent from "./components/TestComponent";

function App() {
  const [apiToken, setToken] = useState('');
  const [user, setUser] = useState();
  const [authorize, setAuthorize] = useState(false);
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
    setAuthorize(true);
    selectConfig();
  }

  const checkedTicket = () => {
    const token = localStorage.getItem('apiToken');
    axios.get('http://127.0.0.1:8000/api/auth/user-profile', config).then(response => {
      setAuthorize(true);
        if (token && token !== 'null') {
          selectToken(token);
        }
      }
    ).catch(e => {
      if (e.response.status === 401) {
        setAuthorize(false);
        localStorage.clear();
      }
    })

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
            <Route path='/desks/:id' element={<Desks token={apiToken} config={config}/>}/>
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
