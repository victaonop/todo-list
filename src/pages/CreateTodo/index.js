import { Grid, TextField } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import GeneralContext from "../../GeneralContext";
import Button from '../../components/Button/styles';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
    description: yup.string().required("obrigatorio"),
});

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

    const {
        control,
        errors,
        handleSubmit,
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onSubmit',
        defaultValues: {
            description: "",
        },
    })

    function handleBack() {
        setTask("");
        reset("");
        setSwitchComp('todoList');
    }

    function newUser(value) {
        var allTodo = JSON.parse(localStorage.getItem("todo"))
        if (task) {
            var newTodo = allTodo.map(allTodo => allTodo.description === task ? { ...allTodo, description: value.description } : allTodo);
            localStorage.setItem('todo', JSON.stringify(newTodo));
            setTodo(newTodo)
            
        } else {
            allTodo.push({ checked : false, description: value.description})
            localStorage.setItem('todo', JSON.stringify(allTodo));
            setTodo(allTodo)
            reset("");
        }
        setSnackStatus(prevState => ({
            ...prevState,
            open: true,
            text: task ? "Tarefa modificada com sucesso!" : "Nova tarefa adicionada!",
          }))
    }

    useEffect(() => {
        if (task) {
            console.log(task)
            setValue("description", task)
        }
    }, [task]);

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
                <form
                    onSubmit={handleSubmit(newUser)}
                    style={{ width: "100%" }}
                    autoComplete="off"
                >
                    <Grid container xs={12} lg={12} md={12}>
                        <Grid xs={12} lg={12} md={12} style={{ textAlign: 'right' }}>
                            <Button onClick={() => handleBack()}>
                                Voltar
                            </Button>
                        </Grid>
                        <Grid xs={12} lg={12} md={12} style={{ textAlign: 'center' }}>
                            <h1>{task ? "Alterar tarefa" : "Nova tarefa"}</h1>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} lg={12} md={12} style={{ margin: '20px 0px' }}>
                        <Controller
                            as={
                                <TextField
                                    name="description"
                                    style={{ margin: '0px 15px' }}
                                    helperText={errors?.description?.message}
                                    fullWidth
                                    id="description"
                                    label="Descreva sua atividade"
                                />
                            }
                            name="description"
                            defaultValue=""
                            control={control}
                        />
                    </Grid>
                    <Grid xs={12} lg={12} md={12} style={{ textAlign: 'right', margin: '100px 0px 0px 0px' }}>
                        <Button type="submit">
                            {task ? "Alterar" : "Adicionar"}
                        </Button>
                    </Grid>
                </form>
            </GeneralContext.Provider>
        </>
    );
}

export default TodoList;


