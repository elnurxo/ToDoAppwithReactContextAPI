import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useTodosContext } from "../../context/todos";
import toast, { Toaster } from 'react-hot-toast';


function CompletedToDos() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  const { todos, setTodos } = useTodosContext();

  const emptyCompletedTodos = () => {
    const filteredToDos = todos.filter(x=>x.completed===false);
    localStorage.setItem('todo', JSON.stringify(filteredToDos));
    notify();
    setTodos(filteredToDos);
  };
  let localTodo = JSON.parse(localStorage.getItem('todo'));
  const notify = () => {
    toast.success('Completed ToDo Items deleted successfully!',{
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
            Completed To Do Items...
          </h3>
          <ul style={{width:"60%",margin:'0 auto'}}>
            {localTodo.filter((todo) => todo.isCompleted).map((todo,key)=>{
                return(
                    <li key={key} style={{backgroundColor:'cadetblue'}}>{todo.todo}</li>
                )
            })}
          </ul>
            <Button onClick={emptyCompletedTodos} variant="contained">Clear Completed ToDos</Button>
            <Toaster/>
        </>
      )}
    </Box>
  );
}

export default CompletedToDos;
