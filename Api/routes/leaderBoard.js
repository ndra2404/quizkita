const router = require('express').Router();
const { leaderboard } = require('../src/controllers');

router.post('/leaderboard/saveData', leaderboard.saveData);
router.get('/leaderboard', leaderboard.getAllData);
module.exports = router;