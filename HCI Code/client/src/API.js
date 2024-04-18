'use strict';

const SERVER_URL = 'http://localhost:3001/api/';

/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
    // server API always return JSON, in case of error the format is the following { error: <message> } 
    return new Promise((resolve, reject) => {
        httpResponsePromise
            .then((response) => {
                if (response.ok) {
                    // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
                    response.json()
                        .then(json => resolve(json))
                        .catch(err => reject({ error: "Cannot parse server response_OK" }))

                } else {
                    // analyzing the cause of error
                    response.json()
                        .then(obj =>
                            reject(obj)
                        ) // error msg in the response body
                        .catch(err => reject({ error: "Cannot parse server response" })) // something else
                }
            })
            .catch(err =>
                reject({ error: "Cannot communicate" })
            ) // connection error
    });
}

const getAllExercises = async () => {
    return getJson(
        fetch(SERVER_URL + 'exercises')
    );
}

const getMuscleGroups = async () => {
    return getJson(
        fetch(SERVER_URL + 'musclegroups')
    );
}

const getExercisesMuscleGroup = async (idmusclegroup) => {
    return getJson(
        fetch(SERVER_URL + `musclegroups/${idmusclegroup}`)
    );
}

const getExerciseInfo = async (idex) => {
    return getJson(
        fetch(SERVER_URL + `exercises/${idex}`)
    );
}

const getDailyTraining = async () => {
    return getJson(
        fetch(SERVER_URL + 'dailytraining')
    );
}

const getAllQuizzes = async () => {
    return getJson(
        fetch(SERVER_URL + 'quizzes')
    )
}

const getQuizInfo = async (idquiz) => {
    return getJson(
        fetch(SERVER_URL + `quizzes/${idquiz}`)
    )
}

const getUserLevel = async () => {
    return getJson(
        fetch(SERVER_URL + 'userlevel')
    )
}

const increaseUserLevel = async () => {
    return getJson(
        fetch(SERVER_URL + 'userlevel', {
            method: 'PUT',
        })
    )
}

const setQuizNotNew = async (idquiz) => {
    return getJson(
        fetch(SERVER_URL + `quiz/new/${idquiz}`, {
            method: 'PUT',
        })
    )
}

const setQuizPassed = async (idquiz) => {
    return getJson(
        fetch(SERVER_URL + `quiz/${idquiz}`, {
            method: 'PUT',
        })
    )
}

const getQuestions = async (idquiz) => {
    return getJson(
        fetch(SERVER_URL + `questions/${idquiz}`)
    )
}

const getAnswers = async (idquiz) => {
    return getJson(
        fetch(SERVER_URL + `answers/${idquiz}`)
    )
}

const removeAllExercisesDailyTraining = async () => {
    return getJson(
        fetch(SERVER_URL + "dailytraining", {
            method: 'DELETE',
        })
    )
}

const removeExerciseDailyTraining = async (idex) => {
    return getJson(
        fetch(SERVER_URL + `dailytraining/${idex}`, {
            method: 'DELETE',
        })
    )
}

const addExerciseDailyTraining = async (idex) => {
    return getJson(
        fetch(SERVER_URL + "dailytraining", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idex: idex })
        })
    );
}

const tickExerciseDailyTraining = async (idex) => {
    return getJson(
        fetch(SERVER_URL + "dailytraining", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idex: idex })
        })
    );
}

const swapExerciseDailyTraining = async (idex, iddaily) => {
    return getJson(
        fetch(SERVER_URL + "dailytraining/swap", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idex: idex, iddaily: iddaily })
        })
    );
}



const API = { getAllExercises, getMuscleGroups, getExercisesMuscleGroup,
    getExerciseInfo, getAllQuizzes, getQuizInfo, getUserLevel, increaseUserLevel, setQuizNotNew,
    setQuizPassed, getQuestions, getAnswers, removeAllExercisesDailyTraining,
    removeExerciseDailyTraining, addExerciseDailyTraining,
    tickExerciseDailyTraining, getDailyTraining, swapExerciseDailyTraining };
export default API;


