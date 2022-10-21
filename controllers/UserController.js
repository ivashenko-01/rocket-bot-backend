import jwt from 'jsonwebtoken'; // Подключение библиотеки для генерации токена
import bcrypt from 'bcrypt'; // Подключение библиотеки для шифрования пароля
import { validationResult } from 'express-validator';
import UserSiteModel from '../models/UserSite.js';



export const register = async (req, res) => { // --- Если придет запрос [/auth/register], то проверить [registerValidation], если все норм, то выполнять [(req, res)]

    try {


        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt); // --- Передача пароля и алгоритма шифрования


        const doc = new UserSiteModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            'secret123', 
            {
                expiresIn: '30d',
            }
        );

        const {passwordHash, ... userData} = user._doc;

        res.json({
            ... userData, 
            token, 
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }

}

export const login = async (req, res) => {

    try {

        const user = await UserSiteModel.findOne({ email: req.body.email }); // Поиск пользователя в базе данных
        
        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash); // Проверка, сходятся ли пароли ( введенный и в базе данных )
        
        if(!isValidPass){
            return res.status(400).json({
                message: 'Неверный пароль'
            });   
        }


        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            'secret123', 
            {
                expiresIn: '30d',
            }
        );

        const {passwordHash, ... userData} = user._doc;

        res.json({
            ... userData, 
            token, 
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
    
}

export const getMe = async (req, res) => {
    try {
      const user = await UserSiteModel.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }
  
      const { passwordHash, ...userData } = user._doc;
  
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Нет доступа',
      });
    }
  };

