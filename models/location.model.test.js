import { locationCreator } from './location.model.js';

describe('given a connection with MongoDB', () => {
    const collection = 'testingLocations';
    beforeAll(() => {});

    test('then should exist our Model ', async () => {
        const { Location, connection } = await locationCreator(collection);
        expect(connection.connections[0].name).toBe(process.env.DBNAME);
        expect(Location).toBeTruthy();
        expect(Location.modelName).toBe(collection);
        connection.disconnect();
    });
});
