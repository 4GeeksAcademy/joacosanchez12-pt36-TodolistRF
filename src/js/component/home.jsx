import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Home = () => {
  const [todos, setTodos] = useState([]);  
  const [newTodo, setNewTodo] = useState("");  

  const apiUrl = "https://playground.4geeks.com/todo/users/joaquinsanchez12"; // URL de la operacion API
  const apiTodos = "https://playground.4geeks.com/todo/todos/joaquinsanchez12"; // URL de la operacion API
  const apiDelete = "https://playground.4geeks.com/todo/todos";

  // Carga tareas cuando la API inicie con GET
  const tareajoaquinsanchez12 = () => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      if (Array.isArray(data.todos)) {
        setTodos(data.todos); 
      } else {
        setTodos([]);  
      }
    })
};

useEffect(() => {
	tareajoaquinsanchez12();  
}, []);


  
  const createTaskOnServer = (newTodo) => {
    fetch(apiTodos, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Error al crear la tarea");
      }
      return resp.json();
    })
    .then(() => {
		tareajoaquinsanchez12();  
    })
    };
  

  // Función que maneja la tecla ENTER para agregar tareas
  const handleKeyDown = (e) => {
    if (e.code === "Enter" && newTodo.trim() !== "") {
      const newTask = { label: newTodo, done: false };
      createTaskOnServer(newTask);  
      setNewTodo("");  
    }
  };

    
    const removeTask = (id) => {
      fetch(`${apiDelete}/${id}`, {
        method:"DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((resp)=> {
        console.log(resp);
        if(resp.status==204){joaquinsanchez12()

        }
        
      })
      
    };

    // eliminar tareas
  const clearAllTasks = () => {
    if (todos.length > 0) {
    const updatedTodos = [];  
    setTodos(updatedTodos); 
    updateTasksOnServer(updatedTodos);  
  }
  };

  return (
    <>
      <div className="text-center mt-5">
      <h1 className ="todos-title">TodoList</h1>
      </div>

      {/* Uso de TodoInput como un componente y lo separo con un div diferente para el recuadro.*/}
      <div className="home-container">
      <TodoInput
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} 
        onKeyDown={handleKeyDown}  
      />

      {/*lista de tareas */}
      <TodoList tasks={todos} removeTask={removeTask} />


       <button className="btn btn-danger mt-3" onClick={clearAllTasks}>
          Clear All Tasks
        </button>

        <p className="items-left">{todos.length} item{todos.length !== 1 && 's'} left</p>
    </div>
    </>
  );
};

export default Home;