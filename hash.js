const bcrypt = require('bcrypt');

const run = async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('testing', salt);
    console.log(salt);
    console.log(hash);
};

run();