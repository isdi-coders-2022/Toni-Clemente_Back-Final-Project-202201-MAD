import { userCreator } from '../models/user.model.js';

export async function getAllLocations(Location) {
    /* const { booksCollection, mongoClient } = await booksConnect();
    const cursor = booksCollection.find();
    const result = await cursor.toArray();
    mongoClient.close(); */
    return await Location.find({}).populate('author', {
        locations: 0,
    });
}

export async function getLocation(id, Location) {
    /*  const dbId = ObjectId(id);
    const { booksCollection, mongoClient } = await booksConnect();
    const result = await booksCollection.findOne({ _id: dbId });
    mongoClient.close(); */
    return await Location.findById(id).populate('author', {
        locations: 0,
    });
}

export async function insertLocation(body, Location) {
    /* const { booksCollection, mongoClient } = await booksConnect();
    const result = await booksCollection.insertOne(book);
    mongoClient.close(); */

    // body = {title, responsible, isCompleted}
    const User = userCreator();
    const user = await User.findById(body.author);
    if (!user) {
        return null;
    }
    const tempLocation = await Location.create(body);
    const savedLocation = await Location.findById(tempLocation.id).populate(
        'author',
        {
            locations: 0,
        }
    );

    // const result = await newTask.save(); incluido en create
    user.locations = [...user.locations, savedLocation.id];
    user.save();
    return savedLocation;
}

export async function updateLocation(id, partialLocation, Location) {
    /* const dbId = ObjectId(id);
    const { booksCollection, mongoClient } = await booksConnect();
    const result = await booksCollection.findOneAndUpdate(
        { _id: dbId },
        {
            $set: { ...partialBook },
        }
    );
    mongoClient.close(); */
    return await Location.findByIdAndUpdate(id, partialLocation, {
        new: true,
    }).populate('responsible', {
        locations: 0,
    });
}

export async function deleteLocation(id, Location) {
    /* const dbId = ObjectId(id);
    const { booksCollection, mongoClient } = await booksConnect();
    const result = await booksCollection.findOneAndDelete({ _id: dbId });
    mongoClient.close(); */
    return await Location.findByIdAndDelete(id).populate('responsible', {
        locations: 0,
    });
}
