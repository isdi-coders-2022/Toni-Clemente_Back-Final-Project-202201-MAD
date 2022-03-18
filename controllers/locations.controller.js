/* eslint-disable no-unused-vars */
//import * as crud from '../services/locations-crud.js';

import { createError } from '../services/errors.js';
import { User } from '../models/user.model.js';

import { Location } from '../models/location.model.js';

export const getAllLocations = async (req, res, next) => {
    try {
        const resp = await Location.find({}).populate('author', {
            locations: 0,
        });
        res.json(resp);
    } catch (err) {
        console.log(err);
        next(createError(err));
    }
};

export const getLocation = async (req, res, next) => {
    try {
        const resp = await Location.findById(req.params.id).populate('author', {
            locations: 0,
        });
        res.json(resp);
    } catch (err) {
        next(createError(err));
    }
};

export const insertLocation = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.author);

        if (!user) {
            return null;
        }
        const savedLocation = await Location.create({
            ...req.body,
            author: user._id,
        });

        // const savedLocation = await Location.findById(tempLocation.id).populate(
        //     'author',
        //     {
        //         locations: 0,
        //     }
        // );

        // const result = await newTask.save(); incluido en create
        user.locations = [...user.locations, savedLocation.id];
        user.save();
        //console.log(savedLocation);
        res.json(savedLocation);
    } catch (err) {
        //console.log('catched error:', err);
        next(createError(err));
    }
};

export const deleteLocation = async (req, res, next) => {
    try {
        const resp = await Location.findByIdAndDelete(req.params.id).populate(
            'author',
            {
                locations: 0,
            }
        );
        res.json(resp);
    } catch (err) {
        next(createError(err));
    }
};

export const updateLocation = async (req, res, next) => {
    try {
        const resp = await Location.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate('author', {
            locations: 0,
        });
        res.json(resp);
    } catch (err) {
        next(createError(err));
    }
};
