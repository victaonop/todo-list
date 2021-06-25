import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "../../GeneralContext";
import CheckboxList from "../../components/ListItem";
import Button from '../../components/Button/styles';


const statusOptions = [
    {
        key: 0, value: "Todas"
    },
    {
        key: 1, value: "Completas"
    },
    {
        key: 2, value: "Incompletas"
    },
];

const defaultCount = {
    total: 0,
    completed: 0,
    incompleted: 0
};

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
            </GeneralContext.Provider>
        </>
    );
}

export default TodoList;


