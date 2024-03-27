const jwt = require('jsonwebtoken');

module.exports = createToken = (_id)=> {
    return jwt.sign({_id}, 'AVerySecretCodeYouMustNotKnow', {expiresIn: '3d'});
}