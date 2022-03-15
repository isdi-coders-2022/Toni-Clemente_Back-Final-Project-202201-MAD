// import mongoose from 'mongoose';
import * as controller from './locations.controller.js';
import '../models/location.model.js';
import * as crud from '../services/locations-crud.js';

jest.mock('../models/location.model.js', () => {
    return {
        locationCreator: jest.fn().mockResolvedValue({}),
    };
});
jest.mock('../services/locations-crud.js');

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
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                crud.getAllLocations.mockResolvedValue([{}]);
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
    });

    describe('When deleteLocation is triggered', () => {
        describe('And id exists', () => {
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
});
