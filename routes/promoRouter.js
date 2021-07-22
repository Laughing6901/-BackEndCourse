const express = require('express');
const bodyParser = require('body-parser');
const promotions = require('../models/promotions');
const promotionsRouter = express.Router();
var authenticate = require('./authenticate');

promotionsRouter.route('/:promoId')
.get((req,res,next) => {
    promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }
        else {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null) {
            promo.push(req.body);
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);                
            }, (err) => next(err));
        }
        else {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions/'
        + req.params.promoId + '/comments');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    promotions.findById(req.params.promoId)
    .then((promo) => {
        if (promo != null) {
            for (var i = (promo.length -1); i >= 0; i--) {
                promo.id(promo.id).remove();
            }
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);                
            }, (err) => next(err));
        }
        else {
            err = new Error('promo ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

promotionsRouter.route('/')
.get((req,res,next) => {
    promotions.find()
    .then((promo) => {
        if (promo != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }
        else {
            err = new Error('promo ' + req.params + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    promotions.find()
    .then((promo) => {
        if (promo != null) {
            promo.push(req.body);
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);                
            }, (err) => next(err));
        }
        else {
            err = new Error('promo ' + req.params + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions/'
        + req.params);
})
.delete(authenticate.verifyUser, (req, res, next) => {
    promotions.find()
    .then((promo) => {
        if (promo != null) {
            for (var i = (promo.length -1); i >= 0; i--) {
                promo.remove();
            }
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);                
            }, (err) => next(err));
        }
        else {
            err = new Error('promo ' + req.params + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});



module.exports = promotionsRouter;