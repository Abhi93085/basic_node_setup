const { authPlugins } = require('mysql2');
const AuthService = require('../services/auth.service');
const validator = require('validator');
const router = require('../routes/auth.route');
class AuthController {
    static async Testing(req, res) {
        const message = 'Hii Test Route is working Perfectly';
        try {
            res.status(200).json({
                success: true,
                message: message
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })

        }
    }

    static async  registerUser(req, res) {
        try {
            console.log('req----body', req.body)
            if (!req.body.name || !req.body.email  || !req.body.password || !req.body.mobile || !req.body.address) {
                return res.status(400).json({
                    success: false,
                    message: 'All parameters required',
                });
            }

            if (!validator.isEmail(req.body.email)) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid email ',
                });

            }
            const isUserExist = await AuthService.isUserExist(req.body.email);
            if (isUserExist) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exist'
                })
            }
            const user = await AuthService.createUser(req.body);
            if (user) {
                return res.status(201).json({
                    success: true,
                    message: "User created successfully"
                });
            }
        } catch (error) {
            console.log('err', error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async login(req,res) {
        try {
            const data= req.body;
            console.log('body data--->>>',data);
            if(!req.body.email || !req.body.password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password is required!!'
                });
            }
            const isUserExist = await AuthService.isUserExist(data.email);
            if(!isUserExist) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found!!'
                });
            }
            const checkPassword = await AuthService.checkPassword(req.body.email,req.body.password);
            if(!checkPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Password is incorrect!!'
                });
            }
            const loginData = await AuthService.login(req.body);
            console.log('Login data--->>>',loginData);
            return res.status(200).json({
                success: true,
                data:{
                    name: loginData.user.name,
                    email: loginData.user.email,
                    status: loginData.user.status,
                    mobile: loginData.user.mobile,
                },
                token: loginData.token,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:error.message
            });
            
        }
    }

    static async updateProfile(req,res) {
        try {
            const userId = req.id;
            const data = req.body;
            data.id = userId;
            const userData = await AuthService.updateUser(data);
            return res.status(200).json({
                success: true,
                message: 'Profile updated sucessfully',
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    static async getProfile(req,res) {
        try {
            const user_id = req.id;
            const userDetail = await AuthService.findUserById(user_id);
            return res.status(200).json({
                success: true,
                data: userDetail
            });
            
        } catch (error) {
            console.log('Error getting profile-->',error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

    }

}

module.exports = AuthController;