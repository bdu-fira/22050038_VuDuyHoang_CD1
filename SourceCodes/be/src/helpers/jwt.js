const jwt = require("jsonwebtoken");
const configs = require("../config");
const EXPIRES_IN = 60 * 60 *12;
//payload = data muốn gen token
const generateToken = (payload) => {

    //Định danh Token
    const token = jwt.sign({
        idUser: payload.idUser,
        password: payload.password
    },
    "THTBANKING_VER2",
    {
        expiresIn: EXPIRES_IN
    });
    return {
        token,
        expiresIn: EXPIRES_IN
    }
}

module.exports = {
    generateToken
};