const express = require('express');
const User = require('../models/user_model');
const Joi = require('@hapi/joi');

const route = express.Router();

/**
 * Schema gets it from https://joi.dev/api/?v=17.4.1
 */
 const schema = Joi.object({
    id: Joi.number()        
        .required(),

    id_job: Joi.string()
        .alphanum()
        .required(),

    latitude: Joi.number()
        .required(),

    longitude: Joi.number()
        .required(),
});

route.get('/:id/:id_job', (req,res) => {
    let result = getLatLon(req.params.id, req.params.id_job);
    result.then(user => {
        res.json({
            user
        })        
    }).catch(err => {
        res.status('400').json({
            err
        })
    });
});

route.post('/', (req, res) => {
    let body = req.body;
    const {error, value} = schema.validate({id : body.id, id_job : body.id_job, latitude : body.latitude, longitude : body.longitude});
    if(!error){
        let result = insertLatLon(body);
        result.then(user => {
            res.json({
                user
            })
        }).catch(err => {
            res.status('400').json({
                err
            })
        });
    }
    else{
        res.status('400').json({
            error
        })
    }
});

route.put('/:id/:id_job', (req, res) => {
   // const {error, value} = schema.validate({latitude : req.body.latitude, longitude : req.body.longitude});
    //if(!error){
        let result = updateUser(req.params.id, req.params.id_job, req.body);
        result.then(user => {
            res.json({
                user
            })
        }).catch(err => {
            res.status('400').json({
                err
            })
        });
    // }
    // else{
    //     res.status('400').json({
    //         error
    //     })
    // }
});

route.delete('/:id/:id_job', (req, res) =>{
    let result = disableJob(req.params.id, req.params.id_job);
    result.then( value => {
        res.json({
            usuario : value
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});


async function disableJob(id, id_job){
    let job = await User.updateMany({"id" : id, "id_job" : id_job}, {
        $set : {
            state   : false
        }
    }, {new: true});
    return job;
}

async function updateUser(id, id_job, body){
    let user = await User.findOneAndUpdate({"id" : id, "id_job" : id_job}, {
        $set : {
            latitude    : body.latitude,
            longitude   : body.longitude
        }
    }, {new: true});
    return user;
}

async function insertLatLon(body){
    let user = new User({
        id          : body.id,
        id_job      : body.id_job,
        latitude    : body.latitude,
        longitude   : body.longitude
    });
    return await user.save();
}

async function getLatLon(id, id_job){
    let user = await User.find({"state" : true, "id" : id, "id_job" : id_job});
    return user;
}

module.exports = route