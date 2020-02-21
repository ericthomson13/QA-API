const { Pool } = require('pg');

const Setup = require('./setup');

// TODO: refactor get query to get 5 answers associated with each question
// TODO: structure get data to Client expectations
// TODO: refactor update functions into one

const questions = {};
const pool = new Pool(Setup);

// working just takes some time when use SELECT not JOIN string
questions.get = async (id, count = 5) => {
  await pool.connect();
  const queryText = {
    text: 'SELECT * FROM questions JOIN answers ON questions.id = answers.question_id WHERE questions.product_id =$1  LIMIT $2',
    values: [id, count]
  }
  const res = await pool.query(queryText);
  return res.rows;
};

questions.add = async (req) => {
  await pool.connect();

  try {
    const { product_id } = req.params;
    const { body, asker_name, asker_email } = req.body;

    let date = new Date();
    date = date.toISOString().split('T')[0];

    // this can probably be streamlined
    let id = await pool.query('SELECT MAX(id) + 1 FROM questions');
    id = id.rows[0]['?column?'] + 1;

    const queryText = {
      text: 'INSERT INTO questions(id, product_id, question_body, question_date_written, asker_name, asker_email) VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, product_id, body, date, asker_name, asker_email],
    };
    const res = await pool.query(queryText);
    console.log('res for add answer: ', res.rows);
    return res;
  } catch {
    console.log('error in questionDB.add');
    return 'error'
  }
};

questions.helpful = async (id) => {
  await pool.connect();
  id = parseInt(id);
  
  try {
    const queryText = {
      text: 'UPDATE questions SET helpful = helpful + 1 WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(queryText);
    return res;
  }
  catch {
    console.log(`error in questionDB.helpful`);
    return 'error';
  }
};

questions.report = async (id) => {
  await pool.connect();

  try {
    const queryText = {
      text: 'UPDATE questions SET reported = reported + 1 WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(queryText);
    return res;
  }
  catch {
    console.log(`error in questionDB.report`);
    return 'error';
  }
};

module.exports = questions;