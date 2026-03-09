'use strict';

/*** Importing modules ***/
const express = require('express');
const morgan = require('morgan');                                  // logging middleware
const cors = require('cors');

const { check, validationResult } = require('express-validator'); // validation middleware
const dao = require('./dao');
const userDao = require('./user-dao'); // module for accessing the user table in the DB

// init express
const app = new express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

/*** Passport ***/

/** Authentication-related imports **/
const passport = require('passport');                              // authentication middleware
const LocalStrategy = require('passport-local');                   // authentication strategy (username and password)

/** Set up authentication strategy to search in the DB a user with a matching password.
 * The user object will contain other information extracted by the method userDao.getUser (i.e., id, username, name).
 **/
passport.use(new LocalStrategy(async function verify(username, password, callback) {
  const user = await userDao.getUser(username, password)
  if (!user)
    return callback(null, false, 'Incorrect username or password');

  return callback(null, user); // NOTE: user info in the session (all fields returned by userDao.getUser, i.e, id, username, name)
}));

// Serializing in the session the user object given from LocalStrategy(verify).
passport.serializeUser(function (user, callback) { // this user is id + username + name 
  callback(null, user);
});

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, callback) { // this user is id + email + name 
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
  // e.g.: return userDao.getUserById(id).then(user => callback(null, user)).catch(err => callback(err, null));

  return callback(null, user); // this will be available in req.user
});

/** Creating the session */
const session = require('express-session');

app.use(session({
  secret: "ghduishfdbsehyru",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


/** Defining authentication verification middleware **/
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authorized' });
}


/*** Utility Functions ***/


/* ------------- Users APIs ------------- */

// POST /api/sessions 
// This route is used for performing login.
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json({ error: info });
    }
    // success, perform the login and extablish a login session
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser() in LocalStratecy Verify Fn
      return res.json(req.user);
    });
  })(req, res, next);
});

// GET /api/sessions/current
// This route checks whether the user is logged in or not.
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Not authenticated' });
});

// DELETE /api/session/current
// This route is used for loggin out the current user.
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "User logged out" });
  });
});


/* ------------- APIs ------------- */

/* returns list of muscle groups */ 
app.get('/api/musclegroups',
  async (req, res) => {
    try {
      const musclegroups = await dao.listMuscleGroups();
      res.json(musclegroups);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

// TODO CHECK
/* returns list of exercises for specified muscle group */
app.get('/api/musclegroups/:idmusclegroup',
  async (req, res) => {
    try {
      const exercises = await dao.listExercisesMuscleGroup(req.params.idmusclegroup);
      res.json(exercises);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

/* returns all exercises in db and checks if in daily training */
app.get('/api/exercises',
  async (req, res) => {
    try {
      const exercises = await dao.listExercises();
      res.json(exercises);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

/* returns all quizzes in db */
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await dao.listQuizzes();
    res.json(quizzes);
  } catch {
    res.status(500).json({ errors: ["Database error"] });
  }
}
);

/* returns info on a specified quiz */
app.get('/api/quizzes/:idquiz',
  async (req, res) => {
    try {
      const quiz = await dao.getQuizInfo(req.params.idquiz);
      res.json(quiz);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

/* returns userLevel */
app.get('/api/userlevel',
  async (req, res) => {
    try {
      const userLevel = await dao.getUserLevel();
      res.json(userLevel);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

/* returns all questions in db */
app.get('/api/questions',
  async (req, res) => {
    try {
      const questions = await dao.listQuestions();
      res.json(questions);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

/* returns all answers in db */
app.get('/api/answers',
  async (req, res) => {
    try {
      const answers = await dao.listAnswers();
      res.json(answers);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);


// TO DO check non funziona
/* returns info on a specified exercise */
app.get('/api/exercises/:idex',
[check('idex').isInt({ min: 1 })],
  async (req, res) => {
    try {
      const exercise = await dao.exerciseInfo(req.params.idex);
      res.json(exercise);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

app.get('/api/dailytraining',
  async (req, res) => {
    try {
      const dailytraining = await dao.listDailyTraining();
      res.json(dailytraining);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

/* get questions for a specific quiz */
app.get('/api/questions/:idquiz',
  async (req, res) => {
    try {
      const questions = await dao.getQuestions(req.params.idquiz);
      res.json(questions);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

/* get answers for a specific quiz */
app.get('/api/answers/:idquiz',
  async (req, res) => {
    try {
      const answers = await dao.getAnswers(req.params.idquiz);
      res.json(answers);
    } catch {
      res.status(500).json({ errors: ["Database error"] });
    }
  }
);

// TO DO check non funziona
/* add specific exercise to daily training */
app.post('/api/dailytraining',
  [
    check('idex').isInt({ min: 1 })
  ],
  async (req, res) => {
    try {
      const result = await dao.addExDailyTraining(req.body.idex);
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error: ${err}` });
    }
  }
);

/* swap exercise */
app.put('/api/dailytraining/swap',
  [
    check('idex').isInt({ min: 1 })
  ],
  async (req, res) => {
    try {
      const result = await dao.swapExDailyTraining(req.body.idex, req.body.iddaily);
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error: ${err}` });
    }
  }
);

/* mark exercise as done/undone */
app.put('/api/dailytraining',
  [
    check('idex').isInt({ min: 1 })
  ],
  async (req, res) => {
    try {
      const result = await dao.markExDailyTraining(req.body.idex);
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error: ${err}` });
    }
  }
);

/* increase user level by 1 */
app.put('/api/userlevel',
  async (req, res) => {
    try {
      const result = await dao.increaseUserLevel();
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error: ${err}` });
    }
  }
);

/* set quiz as passed */
app.put('/api/quiz/:idquiz',
  [
    check('idquiz').isInt({ min: 1 })
  ],
  async (req, res) => {
    try {
      const result = await dao.setQuizPassed(req.params.idquiz);
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error: ${err}` });
    }
  }
);

/* set quiz as not new */
app.put('/api/quiz/new/:idquiz',
  [
    check('idquiz').isInt({ min: 1 })
  ],
  async (req, res) => {
    try {
      const result = await dao.setQuizNotNew(req.params.idquiz);
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error: ${err}` });
    }
  }
);


/* remove all exercises from daily training */
app.delete('/api/dailytraining',
  async (req, res) => {
    try {
      const result = await dao.deleteDailyTraining();
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error: ${err}` });
    }
  }
);

/* remove specific exercise from daily training */
app.delete('/api/dailytraining/:idex',
[
  check('idex').isInt({ min: 1 })
],
  async (req, res) => {
    try {
      const result = await dao.deleteExDailyTraining(req.params.idex);
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error: ${err}` });
    }
  }
);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
