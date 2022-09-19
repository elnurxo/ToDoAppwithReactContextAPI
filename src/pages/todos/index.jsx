import { Box } from "@mui/material";
import React, { useState } from "react";
import './index.module.css';
import * as ReactBootStrap from "react-bootstrap";
import { useTodosContext } from "../../context/todos";
import toast, { Toaster } from 'react-hot-toast'; 

function ToDos() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  const { todos, setTodos } = useTodosContext();
  let localTodo = JSON.parse(localStorage.getItem('todo'));

  const handleTodoStatusChange = (key) => {
    todos[key].completed = !todos[key].completed;
    setTodos([...todos]);
    notify(key);
    localTodo[key].isCompleted = !localTodo[key].isCompleted;
    localStorage.setItem('todo', JSON.stringify(localTodo));
  };
  const notify = (key) => {
    toast.success(`ToDo Item marked as ${localTodo[key].isCompleted ? 'uncompleted' : 'completed'}!`,{
      duration: 1800,
      position: "top-center",
      icon: '👏',
      theme: {
        primary: 'green',
        secondary: 'black',
      }
    });
  };
  return (
    <Box sx={{ textAlign: "center", mt: "50px" }}>
      {loading ? (
        <Box
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "75vh",
          }}
        >
          <ReactBootStrap.Spinner animation="grow" />
        </Box>
      ) : (
        <>
          <h3 style={{ margin: "30px 0", fontWeight: "bolder" }}>
            Your To Do's List...
          </h3>
          <ul style={{width:"60%",margin:'0 auto'}}>
            {
               localTodo && localTodo.map((todo,key)=>{
                    return(
                        <li key={key} style={{backgroundColor:'rgba(0, 100, 0, 0.526)'}}><span>{todo.todo}</span> <input onChange={handleTodoStatusChange.bind(null, key)} type="checkbox" checked={todo.isCompleted}
                        name="todoCheckbox"
                        id="todoCheckBox"/><Toaster/></li>
                    )
                })
            }
          </ul>
        </>
      )}
    </Box>
  );
}

export default ToDos;
