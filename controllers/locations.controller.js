/* eslint-disable no-unused-vars */
//import * as crud from '../services/locations-crud.js';
import { locationCreator } from '../models/location.model.js';
import { createError } from '../services/errors.js';
import { userCreator } from '../models/user.model.js';

export const Location = locationCreator();

/* export const getAllTasks = (req, res, next) => {
    crud.getAllTasks(Task)
        .then((resp) => {
            res.json(resp);
        })
        .catch((err) => next(err));
}; */

export const getAllLocations = async (req, res, next) => {
    try {
        const resp = await Location.find({}).populate('author', {
            locations: 0,
        });
        res.json(resp);
    } catch (err) {
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
        const User = userCreator();

        const user = await User.findById(req.body.author);

        if (!user) {
            return null;
        }
        const tempLocation = await Location.create(req.body);

        const savedLocation = await Location.findById(tempLocation.id).populate(
            'author',
            {
                locations: 0,
            }
        );

        // const result = await newTask.save(); incluido en create
        user.locations = [...user.locations, savedLocation.id];
        user.save();
        //console.log(savedLocation);
        return savedLocation;
    } catch (err) {
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

//     crud.deleteLocation(req.params.id, Location)
//         .then((resp) => {
//             if (resp) {
//                 res.status(202);
//                 res.json(resp);
//             } else {
//                 res.status(204);
//                 res.json({ message: 'Tarea no existente' });
//             }
//         })
//         .catch((err) => {
//             next(createError(err));
//         });
// };

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

//     crud.updateLocation(req.params.id, req.body, Location)
//         .then((resp) => {
//             res.json(resp);
//         })
//         .catch((err) => next(createError(err)));
// };
