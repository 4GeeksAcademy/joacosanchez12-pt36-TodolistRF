import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, removeTask }) => {
  if (!Array.isArray(tasks)) {
    return null;  
  }


  return (
    <ul className="list-group mt-3">
      {tasks.map((task, index) => (
        <TodoItem 
        key={index} 
        task={task} 
        removeTask={() => removeTask(task.id)} /> 
      ))}
    </ul>
  );
};

export default TodoList;