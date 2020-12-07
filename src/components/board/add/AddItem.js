import React, { useContext, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import dataApi from '../../../utils/dataApi';

const useStyle = makeStyles((theme) => ({
  inputContainer: {
    width: '280px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnContainer: {
    margin: theme.spacing(0, 1, 1, 1),
  },
  btn: {
    color: '#FFFFFF',
    background: '#3F51B5',
    "&:hover": {
      background: fade('#3F51B5', 0.75),
    },
  },
}));

export default function AddItem({ setOpen, type, listId }) {
  const classes = useStyle();
  const [title, setTitle] = useState('');
  const { addCard, addList } = useContext(dataApi);

  const handleChange = e => {
    setTitle(e.target.value);
  }
  
  const handleSubmit = () => {
    if(title.trim() !== '') {
      if(type === 'card') {
        addCard(title, listId);
        setOpen(false);
        setTitle('');
      } else {
        addList(title);
        setOpen(false);
        setTitle('');
      }
    }else {
      setTitle('');
    }
  }

  return (
    <div>
      <div>
      <Paper className={classes.inputContainer}>
        <InputBase 
          inputProps={{className: classes.input}}
          onBlur={() => setOpen(false)}
          value={title}
          onChange={handleChange}
          fullWidth
          autoFocus
          multiline
          placeholder={type === 'card' ? 'Enter a title of this Card...' : 'Enter list title...'}
        />
      </Paper>
      </div>
      <div className={classes.btnContainer}>
        <Button className={classes.btn} onClick={handleSubmit}>{type === 'card' ? 'Add Card' : 'Add List'}</Button>
        <IconButton>
          <ClearIcon onClick={() => setOpen(false)}/>
        </IconButton>
        {/* {type === 'card' ? <MoreHorizIcon /> : ''} */}
      </div>
    </div>
  )
}
