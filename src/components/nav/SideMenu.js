import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grow, Paper, Drawer } from '@material-ui/core';
import colors from '../../utils/color';
import { getImages } from '../../utils/imageApi';
import color from '../../utils/img/color.jpg';
import image from '../../utils/img/image.jpg';

const useStyle = makeStyles((theme) => ({
  drawer: {
    width: '400px',
  },
  menu: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
  },
  options: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  box: {
    marginTop: theme.spacing(1),
    width: '45%',
    height: '90px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
}));

export default function SideMenu({ open, setOpen, setBackground }) {
  const classes = useStyle();
  const [showImage, setShowImage] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [img, setImg] = useState([]);

  useEffect(async () => {
    setImg(await getImages());
  }, [])

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
      <div className={classes.drawer}>
        <div className={classes.menu}>
          <Paper className={classes.box} onClick={() => {setShowImage(true); setShowColor(false);}}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          <Paper className={classes.box} onClick={() => {setShowImage(false); setShowColor(true);}}
            style={{
              backgroundImage: `url(${color})`,
            }}
          />
        </div>
        
          {showImage ? (
            <Grow in={showImage} onClose={!showImage}>
              <div className={classes.options}>
              {img.map((image, index) => {
                return (
                  <Paper key={index} className={classes.box} onClick={() => {setBackground(image.full)}}
                    style={{
                      backgroundImage: `url(${image.thumb})`,
                    }}
                  />
                )
              })}
              </div>
            </Grow>
          ) : (
            <Grow in={showColor} onClose={!showColor}>
              <div className={classes.options}>
              {colors.map((color, index) => {
                return (
                  <Paper key={index} className={classes.box} onClick={() => {setBackground(color)}}
                    style={{
                      backgroundColor: color,
                    }}
                  />
                )
              })}
              </div>
            </Grow>
            
          )}
        </div>
    </Drawer>
  )
}
