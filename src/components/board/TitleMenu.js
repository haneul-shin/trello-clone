import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Menu, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import dataApi from '../../utils/dataApi';

const useStyle = makeStyles((theme) => ({
  btn: {
    "&:hover":{
      color: '#343434'
    } 
  },
  menu: {
    margin: theme.spacing(2.4, 0, 0, 7.5), 
  },
}));

export default function SimpleMenu({ star, setStar, id }) {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const { deleteList } = useContext(dataApi);

  const handleClickBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (menu) => {
    if(menu === 1){
      setStar(!star);
      setAnchorEl(null);
    }else if(menu === 2){
      deleteList(id);
      setAnchorEl(null);
    }else{
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClickBtn}
        className={classes.btn}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={() => handleClickMenu(1)}>{star ? 'Mark as unstarred' : 'Mark as starred'}</MenuItem>
        <MenuItem onClick={() => handleClickMenu(2)}>Delete this list</MenuItem>
      </Menu>
    </div>
  );
}
