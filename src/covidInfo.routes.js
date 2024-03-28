const express= require('express')
const router= express.Router();
const covidInfoController= require('./covidInfo.controller.js');

router.get('/', covidInfoController.findAll);

router.post('/new', covidInfoController.create);

router.get('/:id', covidInfoController.findById);

router.put('/:id', covidInfoController.update);

router.delete('/:id', covidInfoController.delete);

module.exports= router