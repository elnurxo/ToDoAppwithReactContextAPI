import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import addToDoImg from "../../assets/addtodo.jpg";
import * as ReactBootStrap from "react-bootstrap";
import { useTodosContext } from "../../context/todos";
import toast, { Toaster } from 'react-hot-toast';

function AddToDo() {
  const { setTodos } = useTodosContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = e.target.todo.value;
    setTodos((prev) => [...prev, { todo, completed: false }]);

    //Add ToDo to local Storage'
    var todosArr = JSON.parse(localStorage.getItem('todo'));
    if(todosArr===null) { todosArr = []; }
    
    const todoObj = {
      todo: todo,
      isCompleted: false
    }
    todosArr.push(todoObj);
    localStorage.setItem('todo', JSON.stringify(todosArr));

    e.target.reset();
  };
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  const notify = () => {
    toast.success('ToDo Item added successfully!',{
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
            Add something to Do...
          </h3>
          <Box
            sx={{
              width: { md: "63%", xs: "85%" },
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
           <form style={{display:'flex'}} onSubmit={handleSubmit}>
           <TextField
              id="outlined-basic"
              required
              label="Please add new to do..."
              variant="outlined"
              name="todo"
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
              onClick={(e) => notify()} 
              type="submit"
                sx={{ px: "35px", ml: "20px", height: "70%" }}
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
              >
                ADD
              </Button>
              <Toaster />
            </Box>
           </form>
          </Box>
          <Box
            sx={{
              borderRadius: "12px",
              width: { md: "40%", xs: "80%" },
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              margin: "0 auto",
              mt: "30px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
            }}
          >
            <img width="100%" src={addToDoImg} alt="add to do page" />
          </Box>
        </>
      )}
    </Box>
  );
}

export default AddToDo;
