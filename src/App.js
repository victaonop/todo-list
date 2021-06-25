import React, { useEffect, useState } from "react";
import "./App.css";
import SnackDefault from "./components/SnackDefault";
import GeneralContext from './GeneralContext';
import * as Styled from "./styles";
import TodoList from "./pages/TodoList";
import CreateTodo from "./pages/CreateTodo";
import NewUserModal from "./components/NewUserModal";

function App() {
  const [snackStatus, setSnackStatus] = useState({
    open: false,
    severity: 'success',
    text: 'Operação realizada com sucesso !',
  })

  const [switchComp, setSwitchComp] = useState('todoList');
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState("");
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState()

  const comp = {
    todoList: <TodoList></TodoList>,
    createTodo: <CreateTodo></CreateTodo>,
  }

  const fixTodo = [
    {
      checked: false, description: "Criar minha primeira terefa"
    },
  ]

  useEffect(() => {
    let userId = localStorage.getItem('id');
    let userName = localStorage.getItem('userName');
    setUser(userName)
    if (!userId || !userName) {
      setNewUser(true);
      const uuidv4 = require("uuid/v4")
      var id = uuidv4()
      localStorage.setItem('id', JSON.stringify(id));
      localStorage.setItem('todo', JSON.stringify(fixTodo));
    }
    setTodo(JSON.parse(localStorage.getItem("todo")))
  }, [newUser]);

  return (
    <>
      <GeneralContext.Provider
        value={{
          snackStatus,
          setSnackStatus,
          switchComp,
          setSwitchComp,
          todo,
          setTodo,
          task,
          setTask,
        }}
      >
        <NewUserModal 
          open={newUser} 
          onConfirm={() => setNewUser(false)}
        />
        <SnackDefault
          snackStatus={snackStatus}
          handleCloseSnack={() => setSnackStatus({ open: false })}
        />
        <Styled.MainPage theme={newUser} conteiner xs={12} lg={12} md={12} style={{ filter: !user ? "blur(3px)" : "none" }}>
          {comp[switchComp]}
        </Styled.MainPage>
      </GeneralContext.Provider>
    </>
  );
}

export default App;


