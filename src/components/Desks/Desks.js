import React, {useState} from 'react';
import Item from "./Item";
import axios from "axios";

function Desks(props) {
  const url = 'http://localhost:8000/api/auth/desks';
  let [desks, setDesks] = useState([]);
  let [name, setName] = useState('');
  const getDesks = async () => {
    axios.get(url, props.config).then(res => {
      setDesks(res.data);
    }).catch(e => {
      console.log(e.response.status);
    })
  }

  const deleteDesk = (id) => {
    setDesks(desks.filter(item =>
      item.id != id
    ));
  }

  const addDesk = async (event) => {
    event.preventDefault();
    axios.post(url, {name}, props.config).then(res => {
      debugger
      setDesks(res.data);
    })
  }

  return (
    <div className='desks-container'>
      <div className="desks-container__desks">
        <h1>DESKS</h1>
        <button onClick={getDesks}>Получить...</button>
        <ul>
          {
            desks.map((item, index) => (
              <Item desk={item} key={index} deleteDesk={deleteDesk}/>
            ))
          }
        </ul>
      </div>
      <div className="desks-container__form">
        <form onSubmit={(event)=> {addDesk(event)}}>
          <label>Имя <input type="text" value={name} onChange={event => {setName(event.target.value)}} /></label>
          <button onClick={addDesk}>Добавитиь</button>
        </form>
      </div>
    </div>
  );
}

export default Desks;


// let req = await fetch('http://127.0.0.1:8000/api/desks', {
//   method: 'POST',
//   mode: 'cors',
//   cache: 'no-cache',
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json'
//   },
//
//   referrerPolicy: 'no-referrer', // no-referrer, *client
//   body: JSON.stringify({
//     name: "test"
//   }) // body data type must match "Content-Type" header
// });
