import React, {useState} from 'react';
import axios from "axios";
import {desksUrl} from "../../url-constants";
import {NavLink} from "react-router-dom";

function Item(props) {
  const {config, getDesks, showModalWindow} = props;
  const {id, name} = props.desk;
  const [edit, setEdit] = useState(false);
  const deleteDesk = props.deleteDesk;
  const [value, setValue] = useState(name);

  const changeName = (id) => {
    setEdit(!edit);
  }

  const submit = (e) => {
    debugger
    e.preventDefault();
    const path = `${desksUrl}/${id}`;
    axios.post(path, {_method: 'PATCH', name: value}, config).then((response) => {
      setEdit(false);
      getDesks();
    }).catch(error => {
      console.error(error);
    })
  }
  return (
    <div>
      <li>
        <p>{id}</p>
        {
          edit
            ?
            <form onSubmit={e => {
              submit(e)
            }}>
              <input value={value} onChange={event => {
                setValue(event.target.value)
              }}/>
              <input type="submit" value='Изменить'/>
            </form>
            :
            <p>{name}</p>
        }

        <button onClick={() => {
          deleteDesk(id)
        }}>Удалить
        </button>
        <button onClick={() => {
          changeName(id)
        }}>{edit ? 'Отмена' : 'Редактировать'}
        </button>
        <NavLink to={`/desks/${id}`}>Показать</NavLink>
      </li>
    </div>
  )
    ;
}

export default Item;
