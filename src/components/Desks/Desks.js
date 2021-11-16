import React, {useEffect, useState} from 'react';
import Item from "./Item";
import axios from "axios";

function Desks(props) {
  const url = 'http://localhost:8000/api/desks';
  let [desks, setDesks] = useState([]);
  const getDesks = async () => {
    axios.get(url, {}, {'authorization': `Bearer ${localStorage.getItem('token')}`}).then(res => {
      setDesks(res.data);
    })
  }

  const deleteDesk = (id) => {
    setDesks(desks.filter(item =>
      item.id != id
    ));
  }

  const addDesk = async () => {

    const getDesks = async () => {
      axios.post(url, {}, {}).then(res => {
        debugger
        console.log(res);
        setDesks(res.data);
      })
    }
  }

  return (
    <div>
      <h1>DESKS</h1>
      <button onClick={getDesks}>Получить...</button>
      <ul>
        {
          desks.map((item, index) => (
            <Item desk={item} key={index} deleteDesk={deleteDesk}/>
          ))
        }
      </ul>
      <button onClick={addDesk}>Добавитиь</button>
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
