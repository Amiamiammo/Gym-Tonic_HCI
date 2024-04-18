'use strict';

/* Data Access Object (DAO) module for accessing airplanes data */

const db = require('./db');

/**
 * Wrapper around db.all
 */
const dbAllAsync = (db, sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

/**
 * Wrapper around db.run
 */
const dbRunAsync = (db, sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, err => {
    if (err) reject(err);
    else resolve();
  });
});

/**
 * Wrapper around db.get
 */
const dbGetAsync = (db, sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) reject(err);
    else resolve(row);
  });
});


// This function retrieves the whole list of musclegroups
exports.listMuscleGroups = async () => {
  const sql = 'SELECT * FROM musclegroups';
  const musclegroups = await dbAllAsync(db, sql, []);
  return musclegroups;
};


// This function retrieves the whole list of exercises
exports.listExercises = async () => {
  const sql = 'SELECT exercises.*, CASE WHEN dailytraining.idex IS NOT NULL THEN 1 ELSE 0 END AS indailytraining FROM exercises LEFT JOIN dailytraining ON exercises.idex = dailytraining.idex';
  const exercises = await dbAllAsync(db, sql, []);
  return exercises;
};

// This function retrieves info about one specific exercise
exports.exerciseInfo = async (idex) => {
  const sql = 'SELECT exercises.*, CASE WHEN dailytraining.idex IS NOT NULL THEN 1 ELSE 0 END AS indailytraining FROM exercises LEFT JOIN dailytraining ON exercises.idex = dailytraining.idex WHERE exercises.idex=?';
  const exerciseInfo = await dbGetAsync(db, sql, [idex]);

  if (!exerciseInfo)
    return { error: "Exercise not found" };

  return exerciseInfo;
};

// This function lists all exercises for a specific muscle group
exports.listExercisesMuscleGroup = async (idmusclegroup) => {
  const sql = 'SELECT exercises.*, CASE WHEN dailytraining.idex IS NOT NULL THEN 1 ELSE 0 END AS indailytraining FROM exercises LEFT JOIN dailytraining ON exercises.idex = dailytraining.idex  WHERE idmusclegroup=?';
  const listExercises = await dbAllAsync(db, sql, [idmusclegroup]);

  if (!listExercises || listExercises.length === 0)
    return { error: "No exercises found" };

  return listExercises;
};

// This function lists all quizzes
exports.listQuizzes = async () => {
  const sql = 'SELECT * FROM quiz';
  const quizzes = await dbAllAsync(db, sql, []);
  return quizzes;
};

// This function retrieves the user level
exports.getUserLevel = async () => {
  const sql = 'SELECT level FROM users';
  const userLevel = await dbGetAsync(db, sql, []);
  return userLevel;
};

// This function retrieves all questions
exports.listQuestions = async () => {
  const sql = 'SELECT * FROM questions';
  const questions = await dbAllAsync(db, sql, []);
  return questions;
};

// This function retrieves all answers
exports.listAnswers = async () => {
  const sql = 'SELECT * FROM answers';
  const answers = await dbAllAsync(db, sql, []);
  return answers;
};

exports.listDailyTraining = async () => {
  const sql = 'SELECT * FROM dailytraining, exercises WHERE dailytraining.idex=exercises.idex';
  const exercises = await dbAllAsync(db, sql, []);
  return exercises;
};

exports.swapExDailyTraining = async (idex, iddaily) => {

  const sql = 'UPDATE dailytraining SET done = 0 , idex=? WHERE iddaily=?';
  await dbRunAsync(db, sql, [idex, iddaily]);

  return {success: true};

}

exports.addExDailyTraining = async (idex) => {

  const sql1 = 'SELECT * FROM dailytraining WHERE idex=?';
  const result = await dbGetAsync(db, sql1, [idex]);

  if(result)
    return {success: false};

  const sql2 = 'INSERT INTO dailytraining (idex, done) VALUES(?, ?)';
  await dbRunAsync(db, sql2, [idex, 0]);

  return {success: true};
};

exports.markExDailyTraining = async (idex) => {

  const sql1 = 'SELECT *, idmusclegroup FROM dailytraining d, exercises e WHERE d.idex=? AND d.idex=e.idex';
  const result = await dbGetAsync(db, sql1, [idex]);

  if(!result)
    return {success: false};

  const sql2 = 'UPDATE dailytraining SET done = NOT done WHERE idex=?';
  await dbRunAsync(db, sql2, [idex]);

  /* se il tick era settato a zero devo incrementare il valore numdone per quel determinato musclegroup */

  if (result.done === 0) {
    const sql3 = 'UPDATE musclegroups SET numdone = numdone + 1 WHERE idmusclegroup=?';
    await dbRunAsync(db, sql3, [result.idmusclegroup]);
  }
  
  return {success: true, ticked: !result.done};
};

exports.deleteDailyTraining = async () => {

  const sql = "DELETE FROM dailytraining";

  const result = await dbRunAsync(db, sql, []);
  return {};
};



exports.deleteExDailyTraining = async (idex) => {

  const sql = "DELETE FROM dailytraining WHERE idex=?";

  const result = await dbRunAsync(db, sql, [idex]);
  return {};
};


exports.increaseUserLevel = async () => {

  const sql1 = 'SELECT level FROM users';
  const userLevel = await dbGetAsync(db, sql1, []);

  const sql2 = 'UPDATE users SET level = level + 1';
  await dbRunAsync(db, sql2, []);

  return {success: true};
};

exports.setQuizNotNew = async (idquiz) => {
  
    const sql1 = 'SELECT * FROM quiz WHERE idquiz=?';
    const result = await dbGetAsync(db, sql1, [idquiz]);
  
    if(!result)
      return {success: false};
  
    const sql2 = 'UPDATE quiz SET new = 0 WHERE idquiz=?';
    await dbRunAsync(db, sql2, [idquiz]);
  
    return {success: true};
  };

exports.setQuizPassed = async (idquiz) => {

  const sql1 = 'SELECT * FROM quiz WHERE idquiz=?';
  const result = await dbGetAsync(db, sql1, [idquiz]);

  if(!result)
    return {success: false};

  const sql2 = 'UPDATE quiz SET passed = 1 WHERE idquiz=?';
  await dbRunAsync(db, sql2, [idquiz]);

  return {success: true};
};

exports.getQuizInfo = async (idquiz) => {
  
    const sql = 'SELECT * FROM quiz WHERE idquiz=?';
    const quizInfo = await dbGetAsync(db, sql, [idquiz]);
  
    if (!quizInfo)
      return { error: "Quiz not found" };
  
    return quizInfo;
  };

  exports.getQuestions = async (idquiz) => {
    
      const sql = 'SELECT * FROM questions WHERE idquiz=?';
      const questions = await dbAllAsync(db, sql, [idquiz]);
    
      if (!questions)
        return { error: "Questions not found" };
    
      return questions;
    };

    exports.getAnswers = async (idquiz) => {
    
      const sql = 'SELECT * FROM answers WHERE idquiz=?';
      const answers = await dbAllAsync(db, sql, [idquiz]);
    
      if (!answers)
        return { error: "Answers not found" };
    
      return answers;
    };


