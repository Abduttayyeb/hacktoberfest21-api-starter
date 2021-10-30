const express = require('express')
const morgan = require('morgan')
const controller = require('./controller/contestantController')

// const Contestantrouter = require('./routes/contestantRoutes')
const app = express()

if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use(express.json());

app.route('/').get(controller.getStatus)

app.route('/contestants')
    .get(controller.getAllContestants)
    .post(controller.createContestant)

app.route('/contestants/:id')
    .get(controller.getContestant)
    .patch(controller.updateContestant)
    .delete(controller.deleteContestant)

app.route('/contestants/:id/upvote')
    .patch(controller.upvoteContestant)


module.exports = app;