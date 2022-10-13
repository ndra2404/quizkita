const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const {questionRouter,leaderBoardRouter} = require('./routes');
router.use('/', questionRouter);
router.use('/', leaderBoardRouter);
app.use('/', router);

app.listen(3002, ()=>{
    console.log('Server Berjalan di Port : 3002');
});
