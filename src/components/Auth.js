import React, {useState} from 'react';
import Input from "./UI/Input";
import Button from "./UI/Button";
import axios from "axios";

const Auth = (props) => {
  const [value, setValue] = useState({email: '', password: ''});
  const sendData = async (e) => {
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/api/auth/login`, {
      email: value.email,
      password: value.password
    }).then(res => {
      props.selectToken(res.data.access_token);
    })
  }
  return (
    <div>
      <h2>Вход</h2>
      <form>
        <div>
          <Input
            value={value}
            setValue={setValue}
            name='email'
            type="email"
          />
        </div>
        <div>
          <Input
            value={value}
            setValue={setValue}
            name='password'
            type="password"
          />
        </div>
        <Button
          name="Авторизоваться"
          onClick={sendData}
        />
      </form>
    </div>
  );
};

export default Auth;


// let req = await fetch('http://127.0.0.1:8000/api/auth/login', {
//   method: 'POST',
//   mode: 'cors',
//   cache: 'no-cache',
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json'
//   },
//
//   referrerPolicy: 'no-referrer', // no-referrer, *client
//   body: JSON.stringify(value) // body data type must match "Content-Type" header
// });
// const result = await req.json();
// props.selectToken(result.access_token);
// `http://127.0.0.1:8000/api/auth/login?email=${value['email']}&password=${value['password']}`
