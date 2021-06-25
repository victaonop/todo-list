import { Grid } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import GeneralContext from "../../GeneralContext";
import CheckboxList from "../../components/ListItem";
import Button from '../../components/Button/styles';

function TodoList() {
    const {
        snackStatus,
        setSnackStatus,
        switchComp,
        setSwitchComp,
        todo,
        setTodo,
        task,
        setTask,
    } = useContext(GeneralContext);

    function clearCompleted() {
        var allTodo = JSON.parse(localStorage.getItem("todo"))
        var newTodo = allTodo.filter(e => e.checked !== true)
        localStorage.setItem('todo', JSON.stringify(newTodo));
        setTodo(newTodo)
        setSnackStatus(prevState => ({
          ...prevState,
          open: true,
          text: "Tarefas limpas!",
        }))
    }

    useEffect(() => {
    }, []);

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
                <Grid xs={12} lg={12} md={12} style={{ textAlign: 'right' }}>
                    <Button onClick={() => setSwitchComp('createTodo')}>
                        Nova tarefa
                    </Button>
                </Grid>
                <Grid xs={12} lg={12} md={12} style={{ textAlign: 'center' }}>
                    <h1>Minhas tarefas</h1>
                </Grid>
                <Grid xs={12} lg={12} md={12}>
                    <CheckboxList></CheckboxList>
                </Grid>
                <Grid xs={12} lg={12} md={12} style={{ textAlign: 'right' , marginTop: "20px"}}>
                    <Button onClick={() => clearCompleted()}>
                        Limpar tarefas completas
                    </Button>
                </Grid>
            </GeneralContext.Provider>
        </>
    );
}

export default TodoList;


