const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Levels = require('../models/level');

const levelRouter = express.Router();
levelRouter.use(bodyParser.json());
levelRouter.route('/')
    .get((req, res, next) => {
        Levels.find(req.query)
            .then((levels) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(levels);
            }, err => next(err))
            .catch((err) => { next(err) });
    })
    .post((req, res, next) => {
        Levels.findOne({ standard: req.body.standard })
            .then((level) => {
                if (level) {
                    Levels.findOneAndUpdate({ standard: req.body.standard }, { $set: req.body }, { new: true })
                        .then((level) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(level);
                        }, err => next(err))
                }
                else {
                    Levels.create(req.body)
                        .then((level) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(level);
                        }, err => next(err))
                }
            }, err => next(err))
            .catch((err)=>{next(err)});
    })

    levelRouter.route('/:levelId')
    .get((req, res, next)=>{
        Levels.findById(req.params.levelId)
        .then((level)=>{
            res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(level);
        }, err => next (err))
        .catch((err)=> next(err));
    })
    .put((req, res, next)=>{
        Levels.findById(req.params.levelId)
        .then((level)=>{
            if(level != null){
                Levels.findByIdAndUpdate(req.params.levelId , { $set: req.body }, { new: true })
                .then((level) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(level);
                }, err => next(err))
            }
            else{
                err = new Error('Levels ' + req.params.levelId + ' not found');
                err.status = 404;
                return next(err); 
            }
        }, err => next(err))
        .catch((err)=> next(err))
    })
    .delete((req, res, next)=>{
        Levels.findByIdAndDelete(req.params.levelId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp); 
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    
module.exports = levelRouter;