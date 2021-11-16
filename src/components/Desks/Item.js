import React from 'react';

function Item(props) {
  const {id, name} = props.desk;
  const deleteDesk = props.deleteDesk;
  return (
    <li>
      <p>{id}</p>
      <p>{name}</p>
      <button onClick={() => {
        deleteDesk(id)
      }}>Удалить
      </button>
    </li>
  );
}

export default Item;
