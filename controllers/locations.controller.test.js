// import mongoose from 'mongoose';
// import { server } from '../index.js';
import * as controller from './locations.controller.js';
// import { locationCreator } from '../models/location.model.js';
import { Location } from '../models/location.model.js';
// import { createError } from '../services/errors.js';
// import { userCreator } from '../models/user.model.js';

//import '../models/location.model.js';
//import * as crud from '../services/locations-crud.js';

jest.mock('../models/location.model.js');

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
    // afterAll(async () => {
    //     server.close();
    //     await mongoose.disconnect();
    // });

    const mockLocation = {
        state: 'murcia',
        town: 'cehegin',
        comment: 'aqui se ponen cosas',
        map: 'vamos a ver',
        author: '622f6afd9b98435e85795974',
        photos: '[]',
    };

    describe('Testing  getAllLocations ', () => {
        test('should return correct mockResolvedValue', async () => {
            Location.find.mockResolvedValue([]);

            await controller.getAllLocations(req, res);

            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([
                {
                    state: 'murcia',
                    town: 'cehegin',
                    comment: 'aqui se ponen cosas',
                    map: 'vamos a ver',
                    author: '622f6afd9b98435e85795974',
                    photos: '[]',
                },
            ]);
        });
    });
    describe('And it does not work (promise is rejected)', () => {
        test('Then call next', async () => {
            Location.find.mockRejectedValue('Test error');
            await controller.getAllLocations(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Testing getLocation()', () => {
        beforeEach(() => {
            Location.findById.mockReturnValue({
                populate: () => ({
                    populate: () => [
                        {
                            state: 'Madrid',
                        },
                    ],
                }),
            });
        });

        test('Then call json', async () => {
            await controller.getLocation(req, res, next);
            expect(res.json).toHaveBeenCalled();
        });

        describe('And it not works (promise is rejected)', () => {
            test('Then call next', async () => {
                Location.findById.mockResolvedValue({
                    populate: () => ({
                        populate: () => {
                            throw new Error('Test error');
                        },
                    }),
                });
                await controller.getLocation(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('Testing  insertLocation ', () => {
        test('should return correct mockResolvedValue', async () => {
            Location.create.mockResolvedValue([mockLocation]);

            await controller.insertLocation(req, res);

            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([
                {
                    state: 'murcia',
                    town: 'cehegin',
                    comment: 'aqui se ponen cosas',
                    map: 'no se como pijo hacer esto',
                    author: '622f6afd9b98435e85795974',
                    photos: '[]',
                },
            ]);
        });

        describe('And it does not work (promise is rejected)', () => {
            test('Then call next', async () => {
                Location.create.mockRejectedValue('Test error');
                await controller.insertLocation(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });

        // describe('And locationcannot be added (promise is rejected)', () => {
        //     beforeEach(() => {
        //         Location.findByIdAndUpdate.mockRejectedValue(
        //             new Error('Add location is not possible')
        //         );
        //     });
        //     test('Then call next', async () => {
        //         await controller.insertLocation(req, res, next);
        //         expect(res.json).not.toHaveBeenCalled();
        //         expect(next).toHaveBeenCalled();
        //     });
        // });
    });

    describe('Testing deleteLocation()', () => {
        beforeEach(() => {
            Location.findByIdAndDelete.mockResolvedValue([
                {
                    'Delete Incident': 12,
                },
            ]);
        });

        test('Then call json', async () => {
            await controller.deleteLocation(req, res, next);
            expect(res.json).toHaveBeenCalled();
        });

        describe('And it not works (promise is rejected)', () => {
            test('Then call next', async () => {
                Location.findByIdAndDelete.mockRejectedValue('Test error');
                await controller.deleteLocation(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('Testing updateLocation()', () => {
        beforeEach(() => {
            Location.findByIdAndUpdate.mockResolvedValue([
                {
                    mockLocation,
                },
            ]);
        });

        test('Then call json', async () => {
            await controller.updateLocation(req, res, next);
            expect(res.json).toHaveBeenCalled();
        });

        describe('And it not works (promise is rejected)', () => {
            test('Then call next', async () => {
                Location.findByIdAndUpdate.mockRejectedValue('Test error');
                await controller.updateLocation(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });
});
