import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Typography } from '@material-ui/core';
import dataApi from '../../utils/dataApi';
import TitleMenu from './TitleMenu';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    "&:focus" : {
      background: '#ddd',
    },
  },
}));

export default function Title({ title, id }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle } = useContext(dataApi);

  const [star, setStar] = useState(false);
  
  const handleChange = e => {
    setNewTitle(e.target.value);
  }

  const handleBlur = () => {
    if(newTitle.trim() !== '') {
      updateListTitle(newTitle, id);
      setOpen(false);
    } else {
      setOpen(true);
      setNewTitle('Enter this list title!');
    }
  }

  const handleStar = e => {
    setStar(!star);
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <IconButton>
          {star ? <StarIcon onClick={handleStar}/> : <StarBorderIcon onClick={handleStar}/>}
        </IconButton>
        {open ? (
          <InputBase
            inputProps={{className: classes.input}}
            onBlur={handleBlur}
            value={newTitle}
            onChange={handleChange}
            fullWidth
            autoFocus
          />       
        ) : (
          <Typography
            className={classes.title}
            onClick={() => setOpen(!open)}
          >
            {title}
          </Typography>
        )}
      </div>
      <TitleMenu star={star} setStar={setStar} id={id}/>
    </div>
  )
}
