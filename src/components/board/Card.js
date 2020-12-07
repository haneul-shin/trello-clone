import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Typography, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Draggable } from 'react-beautiful-dnd';
import dataApi from '../../utils/dataApi';

const useStyle = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    margin: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(1),
    "&:focus" : {
      background: '#ddd',
    },
  },
  icon: {
    justifySelf: 'flex-end',
    fontSize: 'small',
  }
}));

export default function Card({ card, id, index }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const { updateCardTitle } = useContext(dataApi);

  const handleChange = e => {
    setNewTitle(e.target.value);
  }

  const handleBlur = () => {
    if(newTitle.trim() !== '') {
      updateCardTitle(newTitle, id, card.id);
      setOpen(false);
    } else {
      setOpen(true);
      setNewTitle('Enter this card title!');
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <Paper className={classes.root} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {open ? (
            <InputBase
              inputProps={{className: classes.input}}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              autoFocus
              value={newTitle}
            />       
          ) : (
            <Typography
              className={classes.title}
              onClick={() => setOpen(!open)}
            >
              {card.title}
            </Typography>
          )}
          <IconButton>
            {open ? (
              <EditIcon className={classes.icon} onClick={handleBlur} />
            ) : (
              <EditIcon className={classes.icon} onClick={() => setOpen(!open)} />
            )}
          </IconButton>
        </Paper>
      )}
    </Draggable>
  )
}
