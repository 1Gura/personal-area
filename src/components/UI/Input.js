import React from 'react';

const Input = (props) => {
  const {value, setValue, name, type} = props;
  return (
    <div>
      <input
        value={value[name]}
        onChange={(e) => {
          setValue({
            ...value, [name]: e.target.value
          })
        }}
        type={type}/>
    </div>
  );
};

export default Input;
