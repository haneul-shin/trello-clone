import React, { useState } from 'react'
import database from '../utils/data';
import dataApi from '../utils/dataApi';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import List from './board/List';
import AddContainer from './board/add/AddContainer';

const useStyle = makeStyles((theme) => ({
  container: {
    display:'flex',
  },
  
  '@media(max-width: 760px)': {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }
}));

export default function Board() {
  const classes = useStyle();
  const [data, setData] = useState(database);
  const [direction, setDrection] = useState('');

  const getDirection = () => {
    if(window.innerWidth > 760) {
      setDrection('horizontal');
    } else setDrection('vertical');
  };

  window.addEventListener('resize', getDirection);

  const addCard = (title, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newData = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };

    setData(newData);
  };

  const addList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };

    const newData = {
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
      listIds: [...data.listIds, newListId],
    };

    setData(newData);
  };

  const updateCardTitle = (title, listId, cardId) => {
    const list = data.lists[listId];
    list.cards.map((card) => {
      if(card.id === cardId){
        card.title = title;
      }
      
      const newData = {
        ...data,
        lists: {
          ...data.lists,
          [listId]: list,
        },
      };

      return setData(newData);
    });
  }

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newData = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };

    setData(newData);
  };

  const onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result;

    if(!destination){
      return;
    }

    if(type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }
    
    const srcList = data.lists[source.droppableId];
    const dstList = data.lists[destination.droppableId];
    const draggingCard = srcList.cards.filter((card) => card.id === draggableId)[0];

    if(source.droppableId === destination.droppableId) {
      srcList.cards.splice(source.index, 1);
      dstList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [srcList.id]: dstList,
        },
      };
      setData(newState);
    } else {
      srcList.cards.splice(source.index, 1);
      dstList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [srcList.id]: srcList,
          [dstList.id]: dstList,
        },
      };
      setData(newState);
    }
  }

  const deleteList = (listId) => {
    const newListIds = data.listIds.filter((ids) => ids !== listId);
    const newLists = newListIds.map((id) => data.lists[id]);

    const newData = {
      lists: [newLists],
      listsIds: [newListIds],
    };

    console.log(newData);
    //setData(newData);
  };

  return (
    <dataApi.Provider value={{ addCard, addList, updateCardTitle, updateListTitle, deleteList }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='app' type='list' direction={direction}>
            {(provided) => (
              <div className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
                {data.listIds.map((listId, index) => {
                  const list = data.lists[listId];
                  return <List key={listId} list={list} index={index} />
                })}
                <AddContainer type='list' />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </dataApi.Provider>
  )
}
