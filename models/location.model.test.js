import { locationCreator } from './location.model.js';

describe('given a connection with MongoDB', () => {
    const collection = 'Locations';
    beforeAll(() => {});

    test('then our model should exist ', async () => {
        const { Locations, connection } = await locationCreator(collection);
        //expect(connection.connections[0].name).toBe(process.env.DBNAME);
        expect(Locations).toBeTruthy();
        expect(Locations.modelName).toBe(collection);
        connection.disconnect();
    });
});
