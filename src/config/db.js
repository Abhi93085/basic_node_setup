const Sequelize = require('sequelize');
const DB = process.env.DB;
const HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const sequelize = new Sequelize (
    DB,
    DB_USER,
    DB_PASSWORD,
    {
        host: HOST,
        logging: true, //Console.log of query
        dialect: "mysql",
        define: {
            timestamps: true
        },
    }
);

sequelize.authenticate()
.then(function (success) {
    console.log('********************************');
    console.log("* Starting Server ");
    console.log(`* Port: ${process.env.PORT} || 3004`);
    console.log(`* Database: ${process.env.DB}`);
    console.log("Connection has been establize successfully");
})
.catch(function (err) {
    console.log('Unable to connect to Database',err);
});

module.exports = sequelize;
