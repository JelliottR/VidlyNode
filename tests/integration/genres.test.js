const request = require('supertest');
const {Genre} = require('../../models/Genre');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {

    beforeEach(() => {
        server = require('../../app');
    });

    afterEach( async ()=> {
        server.close();
        await Genre.remove({});
    })

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'}
            ]);
            
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();

        });
    });

    describe('GET /:id', () => {
        it('should return a genre with a given id', async () => {
            const genre = await new Genre({name: 'genre1'}).save();

            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
            
        });

        it('should return a 404 for invalid id', async () => {
            const res = await request(server).get(`/api/genres/2`);
            expect(res.status).toBe(404);
        });
    });
});