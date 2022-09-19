import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import { TodosProvider } from "./context/todos";

import {
  Navbar,
  HomePage,
  ToDos,
  AddToDo,
  CompletedToDos,
  NotFound,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <TodosProvider>
      <Navbar />
      <Box sx={{ pt: "58px" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<ToDos />} />
        <Route path="/addtodo" element={<AddToDo />}></Route>
        <Route path="/completedtodos" element={<CompletedToDos />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Box>
      </TodosProvider>
    
    </BrowserRouter>
  );
}

export default App;
