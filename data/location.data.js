import bcrypt from 'bcryptjs';

export default {
    locations: [
        {
            state: 'murcia',
            town: 'caravaca',
            comment: 'aqui se ponen cosas',
            map: 'un mapa',
            author: '622f6afd9b98435e85795974',
            photos: '[]',
        },
        {
            state: 'barcelona',
            town: 'tarragona',
            comment: 'aqui se ponen cosas',
            map: 'un mapa',
            author: '622f6afd9b98435e85795974',
            photos: '[]',
        },
        {
            state: 'castilla la mancha',
            town: 'villarrobledo',
            comment: 'aqui se ponen cosas',
            map: 'un mapa',
            author: '622f6afd9b98435e85795974',
            photos: '[]',
        },
    ],
    users: [
        { name: 'Pepe', passwd: bcrypt.hashSync('1234'), locations: [] },
        { name: 'Elena', passwd: bcrypt.hashSync('1234'), locations: [] },
    ],
};
