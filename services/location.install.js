import {
    installLocations,
    installUsers,
    mongoConnect,
    mongoDisconnect,
} from './db.js';
import data from './location.data.js';

mongoConnect()
    .then(() => installUsers(data.users))
    .then((userResult) => {
        const mockLocations = data.locations.map((item, i) => {
            const index = i <= 1 ? i : 0;
            return { ...item, author: userResult.result[index]._id };
        });
        return installLocations(mockLocations);
    })
    .then((locationResult) => console.log(locationResult.result))
    .then(() => mongoDisconnect());
