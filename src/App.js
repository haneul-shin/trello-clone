import React from 'react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Navigation from './components/Navigation';
import Board from './components/Board';

const useStyle = makeStyles((theme) => ({
  root: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    overflow:'auto',
    width: '100vw',
    height: '100vh',
  },

  '@global': {
    '::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
    },
    
    '::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      margin: '20px',
    },
    
    '::-webkit-scrollbar-thumb': {
      background: '#EBECF0',
      borderRadius: '10px',
    },

    '::-webkit-scrollbar-track:hover': {
      background: 'rgba(0, 0, 0, 0.25)',
    },
    
    '::-webkit-scrollbar-thumb:hover': {
      background: '#FFFFFF',
    },

    '::-webkit-scrollbar-corner': {
      display: 'none',
    }
  },
}));

export default function App() {
  const classes = useStyle();
  const [background, setBackground] = useState('#A6B1F7');

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: background,
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <CssBaseline />
      <Navigation setBackground={setBackground}/>
      <Board />
    </div>
  );
}
