const express = require('express');
const bodyParser = require('body-parser')

const Tutorials = require('../models/tutorials');
const tutorialRoute = express.Router();

tutorialRoute.use(bodyParser.json());

tutorialRoute.route('/')
    .get((req, res, next) => {
        Tutorials.find({})
            .then((tutorials) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(tutorials)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Tutorials.create(req.body)
            .then((tutor) => {
                console.log("Tutorial created", tutor);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(tutor)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Tutorials')
    })
    .delete((req, res, next) => {
        Tutorials.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
    });

tutorialRoute.route('/:tutorialId')
    .get((req, res, next) => {
        Tutorials.findById(req.params.tutorialId)
            .then((tutor) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutor)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST method is not allowed on /Tutorials/' + req.params.tutorialId)
    })
    .put((req, res, next) => {
        Tutorials.findByIdAndUpdate(req.params.tutorialId, {
            $set: req.body
        }, {new: true})
        .then((tutor) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
                res.json(tutor)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Tutorials.findByIdAndRemove(req.params.tutorialId, {
            $set: req.body
        }, {new: true})
        .then((tutor) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
                res.json(tutor)
            }, (err) => next(err))
            .catch((err) => next(err))
    });

    
module.exports = tutorialRoute;
