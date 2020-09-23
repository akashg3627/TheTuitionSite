const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Subjects = require('../models/subject');

const subjectRouter = express.Router();
subjectRouter.use(bodyParser.json());
subjectRouter.route('/')
    .get((req, res, next) => {
        Subjects.find(req.query)
            .then((subjects) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(subjects);
            }, err => next(err))
            .catch((err) => { next(err) });
    })
    .post((req, res, next) => {
        Subjects.findOne({ standard: req.body.standard })
            .then((subject) => {
                if (subject) {
                    Subjects.findOneAndUpdate({ standard: req.body.standard }, { $set: req.body }, { new: true })
                        .then((subject) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(subject);
                        }, err => next(err))
                }
                else {
                    Subjects.create(req.body)
                        .then((subject) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(subject);
                        }, err => next(err))
                }
            }, err => next(err))
            .catch((err)=>{next(err)});
    })

    subjectRouter.route('/:subjectId')
    .get((req, res, next)=>{
        Subjects.findById(req.params.subjectId)
        .then((subject)=>{
            res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(subject);
        }, err => next (err))
        .catch((err)=> next(err));
    })
    .put((req, res, next)=>{
        Subjects.findById(req.params.subjectId)
        .then((subject)=>{
            if(subject != null){
                Subjects.findByIdAndUpdate(req.params.subjectId , { $set: req.body }, { new: true })
                .then((subject) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(subject);
                }, err => next(err))
            }
            else{
                err = new Error('Subjects ' + req.params.subjectId + ' not found');
                err.status = 404;
                return next(err); 
            }
        }, err => next(err))
        .catch((err)=> next(err))
    })
    .delete((req, res, next)=>{
        Subjects.findByIdAndDelete(req.params.subjectId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp); 
            }, (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = subjectRouter;
    
