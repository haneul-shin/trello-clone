const cards = [
    {
        id: 'card-1',
        title: 'How to save data to local file',
    },
    {
        id: 'card-2',
        title: 'How to prevent to lose focus when title is blank',
    },
    {
        id: 'card-3',
        title: 'How to fix deleteList (in Board.js)',
    },
];

const data = {
    lists: {
        'list': {
            id: 'list',
            title: 'Question List',
            cards,
        },
    },
    listIds: ['list'],
}

export default data;
