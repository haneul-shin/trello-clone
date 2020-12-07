import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Title from './Title';
import Card from './Card';
import AddContainer from './add/AddContainer';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '300px',
    background: '#EBECF0',
    margin: theme.spacing(1),
  },
  container: {
    margin: theme.spacing(1),
  },
}));

export default function List({ list, index }) {
  const classes = useStyle();

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <Title title={list.title} id={list.id} />
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
                  {list.cards.map((card, index) => (
                    <Card key={card.id} card={card} id={list.id} index={index}/>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AddContainer type='card' listId={list.id} />
          </Paper>
        </div>
      )}
    </Draggable>
  )
}
