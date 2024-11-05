import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Home = () => {
  const [todos, setTodos] = useState([]);  
  const [newTodo, setNewTodo] = useState("");  

  const apiUrl = "https://playground.4geeks.com/todo/users/joaquinsanchez12"; // URL de la operacion API
  const apiTodos = "https://playground.4geeks.com/todo/todos/joaquinsanchez12"; // URL de la operacion API
  const apiDelete = "https://playground.4geeks.com/todo/users/joaquinsanchez12"; // URL para eliminar tareas

  // Verifica si el usuario existe
  const checkUserExistence = () => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.todos) {
        console.log("NO EXISTE EL USUARIO");
        createUser(); 
      } else {
        setTodos(data.todos); // Si existe, cargamos las tareas
      }
    })
    .catch((error) => console.error("Error al verificar el usuario:", error));
  };

  // Crea un usuario si no existe
  const createUser = () => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "joaquinsanchez12" }) // Datos de ejemplo, ajústalos si es necesario
    })
    .then((resp) => resp.json())
    .then(() => {
      console.log("Usuario creado exitosamente");
      tareajoaquinsanchez12(); // Llamamos a la función para cargar las tareas del usuario
    })
    .catch((error) => console.error("Error al crear el usuario:", error));
  };

  // Cargar las tareas del usuario
  const tareajoaquinsanchez12 = () => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (Array.isArray(data.todos)) {
        setTodos(data.todos);
      } else {
        setTodos([]);
      }
    })
    .catch((error) => console.error("Error al cargar las tareas:", error));
  };

  useEffect(() => {
    checkUserExistence(); // Verificamos si el usuario existe al iniciar
  }, []);

  // Crear tarea en el servidor
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
      tareajoaquinsanchez12(); // Recargamos las tareas
    })
    .catch((error) => console.error("Error al crear la tarea:", error));
  };

  // Función que maneja la tecla ENTER para agregar tareas
  const handleKeyDown = (e) => {
    if (e.code === "Enter" && newTodo.trim() !== "") {
      const newTask = { label: newTodo, done: false };
      createTaskOnServer(newTask);  
      setNewTodo("");  
    }
  };

  // Eliminar tarea
  const removeTask = (id) => {
    fetch(`${apiDelete}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => {
      if (resp.ok) {
        tareajoaquinsanchez12(); // Recargamos las tareas después de eliminar
      }
    })
    .catch((error) => console.error("Error al eliminar la tarea:", error));
  };

  // Eliminar todas las tareas
  const clearAllTasks = () => {
    if (todos.length > 0) {
      fetch(apiDelete, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then((resp) => {
        if (resp.ok) {
          setTodos([]); // Limpiamos las tareas localmente
        }
      })
      .catch((error) => console.error("Error al eliminar todas las tareas:", error));
    }
  };

  return (
    <>
      <div className="text-center mt-5">
        <h1 className="todos-title">TodoList</h1>
      </div>

      {/* Uso de TodoInput como un componente */}
      <div className="home-container">
        <TodoInput
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} 
          onKeyDown={handleKeyDown}  
        />

        {/* Lista de tareas */}
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