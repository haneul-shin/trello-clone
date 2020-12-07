import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, AppBar } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  appBar: {
    background: 'none',
    height: '70px',
  },
  toolBar: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#343434',
    fontFamily: ['Lobster', 'cursive'].join(','),
    fontSize: '2rem',
  },
  btn: { 
    background: '#3F51B5',
    color: '#FFFFFF',
  }
}));

export default function Navbar({ open, setOpen }) {
  const classes = useStyle();

  return (
    <AppBar className={classes.appBar} position="static" elevation={0}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.title}>Trello Clone!</div>
        <Button className={classes.btn} onClick={() => setOpen(!open)}>Show Menu</Button>
      </Toolbar>
    </AppBar>
  )
}
