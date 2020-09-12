const jsonServer = require('json-server');
const auth = require('json-server-auth');
const multer = require('multer');
const express = require('express');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './backend/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const profile = require('./profile');
const board = require('./board');
const user = require('./user');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const upload = multer({storage});

app.use('/static', express.static(__dirname + '/uploads'));
app.use(middlewares);
app.use(jsonServer.bodyParser);
app.db = router.db;

app.get('/profile', auth, profile.get);

app.get('/boards/:id', board.getBoard);

app.patch('/user-avatar', upload.single('avatar'), (req, res) => {
  res.json({avatar: req.file.filename})
});

app.get('/user', auth, user.data);

app.get('/people_boards', auth, board.userBoards);

app.post('/drag-column', board.dragColumn);

app.post('/drag-card-index', board.dragCardIndex);

app.post('/drag-card-column', board.dragCardColumn);

app.use(auth);
app.use(router);
app.listen(8080);
