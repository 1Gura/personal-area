import React, {useEffect, useState} from 'react';
import Item from "./Item";
import axios from "axios";
import {desksUrl} from "../../url-constants";
import ModalWindow from "../ModalWindow";
import {useParams} from "react-router-dom";

function Desks(props) {
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [params]);
  let [desks, setDesks] = useState([]);
  const [modalDesk, setModalDesk] = useState({});
  let [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const getDesks = async () => {
    axios.get(desksUrl, props.config).then(res => {
      setDesks(res.data);
    }).catch(e => {
      console.log(e.response.status);
    })
  }

  const deleteDesk = (id) => {
    const deleteUrl = desksUrl + `/${id}`
    axios.delete(deleteUrl, props.config).then(result => {
      getDesks()
    }).catch(e => {
      console.error(e)
    });
  }

  const showModalWindow = (deskId) => {
    const desk = desks.find(item => item.id === deskId);
    setModalDesk(desk);
    setShowModal(true);
  }

  const addDesk = async (event) => {
    event.preventDefault();
    axios.post(desksUrl, {name}, props.config).then(res => {
      const newDesks = [...desks];
      newDesks.push(res.data);
      setDesks(newDesks);
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
              <Item showModalWindow={showModalWindow} config={props.config} getDesks={getDesks} desk={item} key={index}
                    deleteDesk={deleteDesk}/>
            ))
          }
        </ul>
      </div>
      <div className="desks-container__form">
        <form onSubmit={(event) => {
          addDesk(event)
        }}>
          <label>Имя <input type="text" value={name} onChange={event => {
            setName(event.target.value)
          }}/></label>
          <button onClick={addDesk}>Добавитиь</button>
        </form>
      </div>
      {
        showModal ? <ModalWindow config={props.config}/> : ''
      }
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
