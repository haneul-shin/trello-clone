import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Collapse } from '@material-ui/core';
import AddItem from './AddItem';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '300px',
    marginTop: theme.spacing(1),
  },
  item: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: '#EBECF0',
    "&:hover": {
      background: fade('#000000', 0.25),
    },
  },
  
}));

export default function Add({ type, listId }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AddItem setOpen={setOpen} type={type} listId={listId} />
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.item} elevation={0} onClick={() => setOpen(true)}>
          <Typography>{type === 'card' ? '+ Add a card' : '+ Add another list'}</Typography>
        </Paper>
      </Collapse>
    </div>
  )
}
