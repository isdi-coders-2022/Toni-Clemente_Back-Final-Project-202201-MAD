import mongoose from 'mongoose';

export function locationCreator(modelName = 'Location') {
    const locationSchema = new mongoose.Schema({
        state: { type: String, required: true },
        town: { type: String, required: true },
        comment: { type: String, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        photos: [
            {
                type: String,
                required: true,
            },
        ],
    });

    locationSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            delete returnedObject.__v;
        },
    });

    let location;
    if (mongoose.default.models[modelName]) {
        location = mongoose.model(modelName);
    } else {
        location = mongoose.model(modelName, locationSchema);
    }
    return location;
}

export const Location = locationCreator();
