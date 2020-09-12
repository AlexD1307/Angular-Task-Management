const JWT_SECRET_KEY = require('../node_modules/json-server-auth/dist/constants').JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

let board = {};

board.getBoard = (req, res) => {
  const {db} = req.app;
  const board = db.get('boards').find(board => board.id === +req.params.id);
  const bgColor = db.get('bgColors');

  const copyBoard = JSON.parse(JSON.stringify(board));
  copyBoard.bgColor = bgColor.find(color => color.id === copyBoard.bgColorId);

  res.json(copyBoard)
};

board.userBoards = (req, res) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET_KEY);
      const {db} = req.app;
      const boards = db.get('people_boards').filter(board => board.userId === +data.sub);
      const bgColor = db.get('bgColors');
      const copyBoards = [...boards];

      const boardsBgColor = copyBoards.map(board => {
        board.bgColor = bgColor.find(color => color.id === board.bgColorId);
        const {bgColorId, userId, ...result} = board;
        return result
      });

      res.json(boardsBgColor)
    } catch (error) {
      res.json({error: error})
    }

  } else {
    res.json({
      error: {
        name: "User not authorized",
        status: 401
      }
    })
  }
};

board.dragColumn = (req, res) => {
  const {boardId, previousIndex, currentIndex} = req.body;
  const {db} = req.app;
  const columns = db.get('columns').filter(columns => columns.boardId === boardId).value();

  if (previousIndex > currentIndex) {
    columns.forEach(column => {
      if (column.orderIndex === previousIndex) {
        return column.orderIndex = currentIndex;
      }
      if (column.orderIndex >= currentIndex && column.orderIndex < previousIndex) {
        column.orderIndex += 1;
      }
    })
  } else {
    columns.forEach(column => {
      if (column.orderIndex === previousIndex) {
        return column.orderIndex = currentIndex;
      }
      if (column.orderIndex <= currentIndex && column.orderIndex > previousIndex) {
        column.orderIndex -= 1
      }
    })
  }
  res.json(columns);
};

board.dragCardIndex = (req, res) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  if (token) {
    try {
      const {columnId, previousIndex, currentIndex} = req.body;
      const {db} = req.app;
      const columnCards = db.get('cards').filter(card => card.columnId === columnId).value();
      db.get('users').updateById(1, {avatar: '1595434317504-img.jpg'}).value();

      if (previousIndex > currentIndex) {
        columnCards.forEach(card => {
          if (card.orderIndex === previousIndex) {
            return card.orderIndex = currentIndex;
          }
          if (card.orderIndex >= currentIndex && card.orderIndex < previousIndex) {
            card.orderIndex += 1;
          }
        });
      } else {
        columnCards.forEach(card => {
          if (card.orderIndex === previousIndex) {
            return card.orderIndex = currentIndex;
          }
          if (card.orderIndex <= currentIndex && card.orderIndex > previousIndex) {
            card.orderIndex -= 1;
          }
        })
      }

      res.json(columnCards)
    } catch (error) {
      res.json({error: error})
    }

  } else {
    res.json({
      error: {
        name: "User not authorized",
        status: 401
      }
    })
  }
};

board.dragCardColumn = (req, res) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  if (token) {
    try {
      const {previousColumnId, currentColumnId, previousIndex, currentIndex} = req.body;
      const {db} = req.app;
      const previousColumnCard = db.get('cards').filter(card => card.columnId === previousColumnId).value();
      const currentColumnCard = db.get('cards').filter(card => card.columnId === currentColumnId).value();
      previousColumnCard.forEach(card => {
        if (card.orderIndex === previousIndex) {
          card.columnId = currentColumnId;
          card.orderIndex = currentIndex;
          return;
        }

        if (card.orderIndex > previousIndex) {
          card.orderIndex -= 1;
        }
      });
      currentColumnCard.forEach(card => {
        if (card.orderIndex >= currentIndex) {
          card.orderIndex += 1;
        }
      });

      res.json({previousColumnCard, currentColumnCard});
    } catch (error) {
      res.json({error: error})
    }

  } else {
    res.json({
      error: {
        name: "User not authorized",
        status: 401
      }
    })
  }
};

module.exports = board;
