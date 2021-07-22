const express = require('express');
const bodyParser = require('body-parser');
const leaders = require('../models/leaders');
const leadersRouter = express.Router();

leadersRouter.route('/:leaderId')
.get((req,res,next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }
        else {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null) {
            leader.push(req.body);
            leader.save()
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);                
            }, (err) => next(err));
        }
        else {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders/'
        + req.params.leaderId + '/comments');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null) {
            for (var i = (leader.length -1); i >= 0; i--) {
                leader.id(leader.id).remove();
            }
            leader.save()
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);                
            }, (err) => next(err));
        }
        else {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

leadersRouter.route('/')
.get((req,res,next) => {
    leaders.find()
    .then((leader) => {
        if (leader != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }
        else {
            err = new Error('leader ' + req.params + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    leaders.find()
    .then((leader) => {
        if (leader != null) {
            leader.push(req.body);
            leader.save()
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);                
            }, (err) => next(err));
        }
        else {
            err = new Error('leader ' + req.params + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders/'
        + req.params);
})
.delete(authenticate.verifyUser, (req, res, next) => {
    leaders.findAll()
    .then((leader) => {
        if (leader != null) {
            for (var i = (leader.length -1); i >= 0; i--) {
                leader.remove();
            }
            leader.save()
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);                
            }, (err) => next(err));
        }
        else {
            err = new Error('leader ' + req.params + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});



module.exports = leadersRouter;