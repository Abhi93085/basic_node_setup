const User = require('../models/user');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');
class AuthService {
    static async createUser(body) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('body Data-->>>', body);
                const userData = {
                    email: body.email,
                    name: body.name || '',
                    password: body.password || '',
                    mobile: body.mobile || '',
                    address: body.address || ''
                };
                await User.create(userData);
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    }

    static async updateUser(body) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('body Data-->>>', body);
                const userData = {
                    name: body.name || '',
                    mobile: body.mobile || '',
                    address: body.address || ''
                };
                const user = await User.update( userData, {
                    where: {id: body.id}
                });
                resolve(user);
            } catch (error) {
                console.log('error',error)
                reject(error);
            }
        })
    }

    static async isUserExist(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    where: {
                        email: email
                    }
                });
                // console.log('user', user)
                if (user) {
                    resolve(true);
                }
                resolve(false);
            } catch (error) {
                reject(false);
            }

        })
    }

    static async findUserByEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    where: { email:email }
                });
                console.log('user-->>',user)
                resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }

    static async findUserById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    where: { id }
                });
                console.log('user-->>',user)
                resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }

    static async login(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.findUserByEmail(body.email);
                const token = jwt.sign(
                    { id: user.id, email: user.email }, // Select only essential user data for the token
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );
                const data = {
                    token,
                    user
                }
                resolve(data);
            } catch (error) {
                reject(error)
            }

        })
    }

    static async checkPassword(email,password) {
        return new Promise(async (resolve,reject) => {
            try {
                const user = await this.findUserByEmail(email);
                const isMatch = await bcrypt.compare(password, user.password);
                console.log('isMatch --->>',isMatch)
                if (!isMatch) {
                    resolve(false);
                }
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

}

module.exports = AuthService;