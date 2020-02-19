const dbQuestions = require('../DB/dbQuestions');

const questions = {}
questions.get = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 5;
    const questionsFound = await dbQuestions.get(req.params.product_id, count);
    res.send(questionsFound);
  } catch {
    console.error('error with getting questions');
    res.sendStatus(404);
  }
 
};

questions.post = async (req, res) => {
  try {
    const added = await dbQuestions.add(req.body);
    res.send(201, added);
  } catch {
    console.log('error with posting question');
    res.sendStatus(404);
  }
};

questions.update = async (req, res) => {
  
},


module.exports = questions;