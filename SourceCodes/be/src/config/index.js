require("dotenv").config();

const configs = {
    PORT : process.env.PORT, 
    SECRET_KEY : process.env.SECRET_KEY, 
    
    DB_USER: process.env.DB_USER, 
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT,
    DB_DIALECT : process.env.DB_DIALECT,
    DB_NAME : process.env.DB_NAME,
};

module.exports = configs