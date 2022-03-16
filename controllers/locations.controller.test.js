import mongoose from 'mongoose';
import { server } from '../index.js';
import * as controller from './locations.controller.js';
import { locationCreator } from '../models/location.model.js';
import { Location } from '../models/location.model.js';
import { createError } from '../services/errors.js';
import { userCreator } from '../models/user.model.js';
import {
    getAllLocations,
    getLocation,
    deleteLocation,
    updateLocation,
    insertLocation,
} from './locations.controller.js';
import '../models/location.model.js';
//import * as crud from '../services/locations-crud.js';

jest.mock('../models/location.model.js', () => {
    return {
        locationCreator: jest.fn().mockResolvedValue({}),
    };
});
//jest.mock('../services/locations-crud.js');

describe('Given the locations controller', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = { params: {} };
        res = {};
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });

    describe('When getAllLocations is triggered', () => {
        // describe('And it works (promise is resolved)', () => {
        //     beforeEach(() => {
        //         Location.find.mockResolvedValue({
        //             populate: jest.fn().mockReturnValue([]),
        //         });
        //     });
        //     test('Then call json', async () => {
        //         await controller.getAllLocations(req, res, next);
        //         expect(res.json).toHaveBeenCalled();
        //     });
        // });

        // describe('And it works (promise is resolved)', () => {
        //     beforeEach(() => {
        //         locationCreator.find.mockReturnValue({});
        //     });
        //     test('Then call send', async () => {
        //         await controller.getAllLocations(req, res, next);
        //         expect(res.json).toHaveBeenCalled();
        //     });
        // });

        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                locationCreator.find.mockReturnValue({
                    populate: jest.fn().mockReturnValue([]),
                });
            });
            test('Then call json', async () => {
                await controller.getAllLocations(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });

        describe('If it does not work (promise is rejected)', () => {
            beforeEach(() => {
                crud.getAllLocations.mockRejectedValue(
                    new Error('Get All Locations not possible')
                );
            });
            test('Then call next', async () => {
                await controller.getAllLocations(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When addLocation is triggered', () => {
        describe('And location is trying to add (promise is resolved)', () => {
            beforeEach(() => {
                crud.insertLocation.mockResolvedValue({});
                // req.body = {
                //     title: 'Tarea adicional',
                //     responsible: 'Martín',
                //     isCompleted: false,
                // };
            });
            test('Then call json', async () => {
                await controller.insertLocation(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And location cannot be added (promise is rejected)', () => {
            beforeEach(() => {
                crud.insertLocation.mockRejectedValue(
                    new Error('Add location is not possible')
                );
            });
            test('Then call next', async () => {
                await controller.insertLocation(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                //expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When  getLocationById is triggered', () => {
        describe('And the id is found (promise resolved)', () => {
            beforeEach(() => {
                req.params.id = '619516dd75bcdf9b77e6690c';
                crud.getLocation.mockResolvedValue([]);
            });
            test('Then call json', async () => {
                await controller.getLocation(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And the id is not found (promise rejected)', () => {
            beforeEach(() => {
                req.params.id = '0000';
                crud.getLocation.mockRejectedValue(
                    new Error('The id has not be found')
                );
            });
            test('Then call next', async () => {
                await controller.getLocation(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                // expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When  updateLocation is triggered', () => {
        describe('And the document is updated (promise resolved)', () => {
            beforeEach(() => {
                // req.params.id = '619516dd75bcdf9b77e6690c';
                crud.updateLocation.mockResolvedValue([]);
            });
            test('Then call json', async () => {
                await controller.updateLocation(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('If the id is not found (promise rejected)', () => {
            beforeEach(() => {
                req.params.id = '0000';
                crud.updateLocation.mockRejectedValue(
                    new Error('The id has not being found')
                );
            });
            test('Then call next', async () => {
                await controller.updateLocation(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                // expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When deleteLocation is triggered', () => {
        describe('And if id exists', () => {
            beforeEach(() => {
                // req.params.id = '619516dd75bcdf9b77e6690c';
                crud.deleteLocation.mockResolvedValue([]);
            });
            test('Then call json', async () => {
                await controller.deleteLocation(req, res, next);
                expect(res.status).toHaveBeenCalledWith(202);
                expect(res.json).toHaveBeenCalled();
            });
        });
    });
    describe('And the id does not exists', () => {
        beforeEach(() => {
            req.params.id = '0000';
            crud.deleteLocation.mockResolvedValue(null);
        });
        test('Then call json', async () => {
            await controller.deleteLocation(req, res, next);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalled();
        });
    });
    describe('And there is an error (promise rejected)', () => {
        beforeEach(() => {
            crud.deleteLocation.mockRejectedValue(
                new Error('Error deleting a location')
            );
        });
        test('Then call next', async () => {
            await controller.deleteLocation(req, res, next);
            expect(res.json).not.toHaveBeenCalled();
            //expect(next).toHaveBeenCalled();
        });
    });
});
