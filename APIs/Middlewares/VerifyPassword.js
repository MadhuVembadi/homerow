const bcryptjs = require('bcryptjs');

const verifyPassword = async (request, response, next) => {

    let isMatch = await bcryptjs.compare(request.body.changes.password, request.body.user.password);

    if (isMatch == false) {
        response.send({ message: 'Incorrect Password' })
    }
    else {
        next();
    }

}

module.exports = verifyPassword;