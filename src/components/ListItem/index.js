import React, { Fragment, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { isEmpty, _arrayFilter } from 'lodash'
import GeneralContext from '../../GeneralContext';
import { Grid, MenuItem, TextField } from '@material-ui/core';

const statusOptions = [
  {
    key: 0, value: "Todas"
  },
  {
    key: false, value: "Completas"
  },
  {
    key: true, value: "Incompletas"
  },
];

const defaultCount = {
  total: 0,
  completed: 0,
  incompleted: 0
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList() {
  const {
    snackStatus,
    setSnackStatus,
    switchComp,
    setSwitchComp,
    todo,
    setTodo,
    task,
    setTask,
  } = useContext(GeneralContext)

  const [todoCount, setTodoCount] = useState(defaultCount);
  const [status, setStatus] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (!isEmpty(todo)) {
      localStorage.setItem('todo', JSON.stringify(todo));
      countTasks();
    }
  }, [todo]);

  function handleCheckboxes(description) {
    setTodo(todo.map(todo => todo.description === description ? { ...todo, checked: !todo.checked } : todo))
  }

  function countTasks() {
    var completed = 0;
    todo.forEach(item => {
      if (item.checked == true) {
        completed++
      }
    });
    setTodoCount({
      total: todo.length,
      completed: completed,
      incompleted: todo.length - completed
    })
  }

  function editTask(desc) {
    setTask(desc);
    setSwitchComp('createTodo');
  }

  function removeTask(desc) {
    console.log("desc", desc)
    var allTodo = JSON.parse(localStorage.getItem("todo"))
    var newTodo = allTodo.filter(e => e.description !== desc)
    localStorage.setItem('todo', JSON.stringify(newTodo));
    setTodo(newTodo)
    setSnackStatus(prevState => ({
      ...prevState,
      open: true,
      text: "Tarefa removida!",
    }))
  }

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
        <Grid xs={12} lg={12} md={12} style={{ display: "flex" }}>
          <Grid xs={12} lg={2} md={2}>
            <TextField
              select
              fullWidth
              defaultValue={0}
              label="Tarefas"
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusOptions.map((item) => (
                <MenuItem value={item.key} key={item.key}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid className="count__label" xs={12} lg={12} md={12}>
            Total de tarefas: {todoCount?.total} - Total de tarefas completas: {todoCount?.completed} - Total de tarefas incompletas: {todoCount?.incompleted}
          </Grid>
        </Grid>
        <Grid xs={12} lg={12} md={12} className="todo__list">
          <List className={classes.root}>
            {
              todo?.map(({ index, checked, description }) => {
                return (
                  <Fragment key={index}>
                    {status !== checked &&
                      <ListItem role={undefined} dense button onClick={() => handleCheckboxes(description)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked}
                            onClick={() =>
                              handleCheckboxes(description)
                            }
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': index }}
                          />
                        </ListItemIcon>
                        <ListItemText id={todo.id} primary={description} className="todo__description"/>
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments" onClick={() => editTask(description)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="comments" onClick={() => removeTask(description)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    }
                  </Fragment>
                )
              })
            }
          </List>
        </Grid>
      </GeneralContext.Provider>
    </>
  );
}
