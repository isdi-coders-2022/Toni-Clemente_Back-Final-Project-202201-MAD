import mongoose from 'mongoose';

export function locationCreator(modelName = 'Location') {
    const locationSchema = new mongoose.Schema({
        state: { type: String, required: true },
        town: { type: String, required: true },
        comment: { type: String, required: true },
        map: { type: String, required: true },
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

    let Location;
    if (mongoose.default.models[modelName]) {
        Location = mongoose.model(modelName);
    } else {
        Location = mongoose.model(modelName, locationSchema);
    }
    return Location;
}
