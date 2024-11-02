import React from 'react';

const TodoInput = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      className="form-control"
      placeholder="What needs to be done?" 
      value={value}
      onChange={onChange}  
      onKeyDown={onKeyDown}  
    />
  );
};

export default TodoInput;