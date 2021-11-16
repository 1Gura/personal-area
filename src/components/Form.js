import React, {useState} from 'react';

const Form = (props) => {
  const [count, setCount] = useState(0);
  const changeState = () => {
    setCount(count + 1);
  }
  return (
      <div className="form">
        <h1>FORM TEST {count}</h1>
        <button onClick={changeState}>Клик
        </button>
        <h2>Вы передали: {props.name}</h2>
      </div>
  );
}

export default Form;

