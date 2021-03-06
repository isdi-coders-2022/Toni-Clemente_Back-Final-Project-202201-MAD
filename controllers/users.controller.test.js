import * as controller from './users.controller.js';
import { createToken } from '../services/auth.js';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

jest.mock('../models/user.model.js');
jest.mock('bcryptjs');
jest.mock('../services/auth.js');

describe('Given the users controller', () => {
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

    describe('When getAllUsers is triggered', () => {
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                User.find.mockReturnValue({
                    populate: jest.fn().mockResolvedValue([]),
                });
            });
            test('Then call send', async () => {
                await controller.getAllUsers(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });

        describe('And it does not work (promise is rejected)', () => {
            beforeEach(() => {
                User.find.mockImplementation(() => {
                    throw new Error('Get All Users not possible');
                });
            });
            test('Then call next', async () => {
                await controller.getAllUsers(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When insertUser is triggered', () => {
        // describe('And user is added (promise is resolved)', () => {
        //     beforeEach(() => {
        //         User.findByIdAndUpdate.mockResolvedValue({});
        //     });
        //     test('Then call json', async () => {
        //         await controller.insertUser(req, res, next);
        //         expect(res.json).toHaveBeenCalled();
        //     });
        // });
        const userMock = {
            name: 'toni',
            passwd: '12345',
        };
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                req.body = { name: 'toni', passwd: '12345' };
                bcrypt.hashSync.mockResolvedValue('encrypted1234');
                User.mockReturnValue({
                    name: 'toni',
                    passwd: 'encrypted1234',
                    //passwd: '12345',
                    //id: 1,
                });
            });
            test('Then call json', async () => {
                User.mockReturnValue({
                    save: jest.fn().mockResolvedValue(userMock),
                });
                await controller.insertUser(req, res, next);
                await expect(res.json).toHaveBeenCalledTimes(1);
                // await expect(res.json).toHaveBeenCalledWith({
                //     name: 'toni',
                //     passwd: '12345',
                // });
            });
        });

        describe('And user cannot be added (promise is rejected)', () => {
            beforeEach(() => {
                User.findByIdAndUpdate.mockRejectedValue(
                    new Error('Add user is not possible')
                );
            });
            test('Then call next', async () => {
                await controller.insertUser(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });
    });

    // describe('When insertUser is triggered', () => {
    //     describe('And it works (promise is resolved)', () => {
    //         beforeEach(() => {
    //             req.body = { user: 'Pepe', pass: '1234' };
    //             bcrypt.hashSync.mockResolvedValue('encrypted1234');
    //             User.create.mockReturnValue({
    //                 user: 'Pepe',
    //                 pass: 'encrypted1234',
    //                 id: 1,
    //             });
    //             createToken.mockReturnValue('mock_token');
    //         });
    //         test('Then call json', async () => {
    //             await controller.insertUser(req, res, next);
    //             expect(res.json).toHaveBeenCalledWith({
    //                 pass: 'encrypted1234',
    //                 user: 'Pepe',
    //                 id: 1,
    //             });
    //         });
    //     });
    //     describe('And it not works (promise is rejected)', () => {
    //         beforeEach(() => {
    //             req.body = { user: 'Pepe', pass: '1234' };
    //             bcrypt.hashSync.mockReturnValue('encrypted1234');
    //             User.create.mockRejectedValue(new Error('Error adding user'));
    //             // createToken.mockReturnValue('mock_token');
    //         });
    //         test('Then call next', async () => {
    //             await controller.insertUser(req, res, next);
    //             expect(next).toHaveBeenCalled();
    //         });
    //     });
    // });
});
