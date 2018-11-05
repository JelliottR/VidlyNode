const config = require('config');

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {

        setTimeout(() => {
            throw new Error('FATAL ERROR: jwtPrivateKey is not defined.' );
        }, 1000);
    }
};