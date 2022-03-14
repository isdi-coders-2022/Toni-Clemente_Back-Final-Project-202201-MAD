/* eslint-disable no-unused-vars */
import * as crud from '../services/locations-crud.js';
import { locationCreator } from '../models/location.model.js';
import { createError } from '../services/errors.js';

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
        const resp = await crud.getAllLocations(Location);
        res.json(resp);
    } catch (err) {
        next(createError(err));
    }
};

export const getLocation = (req, res, next) => {
    crud.getLocation(req.params.id, Location)
        .then((resp) => {
            res.json(resp);
        })
        .catch((err) => next(createError(err)));
};

export const insertLocation = (req, res, next) => {
    crud.insertLocation(req.body, Location)
        .then((resp) => {
            res.json(resp);
        })
        .catch((err) => next(createError(err)));
};

export const updateLocation = (req, res, next) => {
    crud.updateLocation(req.params.id, req.body, Location)
        .then((resp) => {
            res.json(resp);
        })
        .catch((err) => next(createError(err)));
};

export const deleteLocation = (req, res, next) => {
    crud.deleteLocation(req.params.id, Location)
        .then((resp) => {
            if (resp) {
                res.status(202);
                res.json(resp);
            } else {
                res.status(204);
                res.json({ message: 'Tarea no existente' });
            }
        })
        .catch((err) => {
            next(createError(err));
        });
};
