const router = require('express').Router();
const { questions } = require('../src/controllers');

router.get('/questions', questions.getAllQuestions);

module.exports = router;