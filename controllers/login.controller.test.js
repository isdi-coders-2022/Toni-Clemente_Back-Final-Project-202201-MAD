import * as controller from './login.controller.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/auth.js';
import { User } from '../models/user.model.js';

jest.mock('../models/user.model.js');
jest.mock('bcryptjs');
jest.mock('../services/auth.js');

describe('Given the login controller', () => {
    let req;
    let res;
    // eslint-disable-next-line no-unused-vars
    let next;
    beforeEach(() => {
        req = { params: {} };
        res = {};
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });

    describe('When login is triggered', () => {
        describe('And there is no user name ', () => {
            test('Then call next', async () => {
                req.body = { name: 'Juanito' };
                await controller.login(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });
        describe('And there is no passwd', () => {
            test('Then call next ', async () => {
                req.body = { passwd: '1234' };
                await controller.login(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });

        describe('And there is user name or passwd', () => {
            beforeEach(() => {
                req.body = { name: 'Juanito', passwd: '1234' };
            });

            describe('And the user name is not found', () => {
                test('Then call next', async () => {
                    await User.findOne.mockResolvedValue(null);
                    await controller.login(req, res, next);
                    expect(next).toHaveBeenCalled();
                });
            });

            describe('And the passwd is not correct', () => {
                test('Then call next', async () => {
                    await User.findOne.mockResolvedValue({});
                    bcrypt.compareSync.mockReturnValue(null);
                    await controller.login(req, res, next);
                    expect(next).toHaveBeenCalled();
                });
            });

            describe('And the user name and passwd are ok', () => {
                test('Then call send', async () => {
                    const user = {
                        name: 'Juanito',
                        id: '1',
                    };
                    await User.findOne.mockResolvedValue(user);
                    bcrypt.compareSync.mockReturnValue(true);
                    createToken.mockReturnValue('mock_token');
                    await controller.login(req, res, next);
                    expect(res.json).toHaveBeenCalledWith({
                        userName: 'Juanito',
                        id: '1',
                        token: 'mock_token',
                    });
                });
            });
        });
    });
});
