import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { locationCreator } from '../models/location.model.js';
import { userCreator } from '../models/user.model.js';

export async function mongoConnect() {
    const user = process.env.DBUSER;
    const password = process.env.DBPASSWD;
    let dbName;
    if (process.env.NODE_ENV === 'test') {
        dbName = process.env.TESTDBNAME;
    } else {
        dbName = process.env.DBNAME;
    }
    console.log('Connecting to', dbName);
    const uri = `mongodb+srv://${user}:${password}@cluster0.znp1w.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    return await mongoose.connect(uri);
}

export async function mongoDisconnect() {
    return mongoose.disconnect();
}

export async function installUsers(data, modelName = 'User') {
    const User = userCreator(modelName);
    const deleted = await User.deleteMany({});
    const result = await User.insertMany(data);
    return { result, deleted };
}

export async function installLocations(data, modelName = 'Location') {
    const Location = locationCreator(modelName);
    const deleted = await Location.deleteMany({});
    const result = await Location.insertMany(data);
    return { result, deleted };
}
