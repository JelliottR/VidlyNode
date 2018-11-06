const request = require('supertest');
const { User } = require('../../models/User');
const { Genre } = require('../../models/Genre');



describe('auth middleware', () => {
    
    let token;

    beforeEach( async () => {
        server = await require('../../app');
        token = new User().generateAuthToken();

    });
    
    afterEach(async () => {
        await Genre.remove({});
         server.close();
    });

    const exec = () => {
        return request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({name: 'genre1'});
    }
    

    it('should return 401 is no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 401 if token is invalid', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});