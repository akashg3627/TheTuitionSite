const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Chapters = require('../models/chapter');

const chapterRouter = express.Router();
chapterRouter.use(bodyParser.json());
chapterRouter.route('/')
    .get((req, res, next) => {
        Chapters.find(req.query)
            .then((chapters) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(chapters);
            }, err => next(err))
            .catch((err) => { next(err) });
    })
    .post((req, res, next) => {
        Chapters.findOne({ standard: req.body.standard })
            .then((chapter) => {
                if (chapter) {
                    Chapters.findOneAndUpdate({ standard: req.body.standard }, { $set: req.body }, { new: true })
                        .then((chapter) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(chapter);
                        }, err => next(err))
                }
                else {
                    Chapters.create(req.body)
                        .then((chapter) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(chapter);
                        }, err => next(err))
                }
            }, err => next(err))
            .catch((err)=>{next(err)});
    })

    chapterRouter.route('/:chapterId')
    .get((req, res, next)=>{
        Chapters.findById(req.params.chapterId)
        .then((chapter)=>{
            res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(chapter);
        }, err => next (err))
        .catch((err)=> next(err));
    })
    .put((req, res, next)=>{
        Chapters.findById(req.params.chapterId)
        .then((chapter)=>{
            if(chapter != null){
                Chapters.findByIdAndUpdate(req.params.chapterId , { $set: req.body }, { new: true })
                .then((chapter) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(chapter);
                }, err => next(err))
            }
            else{
                err = new Error('Chapters ' + req.params.chapterId + ' not found');
                err.status = 404;
                return next(err); 
            }
        }, err => next(err))
        .catch((err)=> next(err))
    })
    .delete((req, res, next)=>{
        Chapters.findByIdAndDelete(req.params.chapterId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp); 
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    
module.exports = chapterRouter;
