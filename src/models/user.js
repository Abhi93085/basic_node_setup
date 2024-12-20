const sequelize = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const { options } = require('../routes/auth.route');
const bcrypt = require('bcrypt');
class User extends Model {

}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
    },
}, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

User.beforeCreate(async(user, options) => {
    if(user.password){
        const  salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
    }
})

User.sync({
    alter: false
})
    .then(() => {
        console.log('User Table Created Successfully');
    })
    .catch(err => {
        console.log('Error Creating User Table');
    });

    

module.exports = User;