/* 
    -> Используемая база данных: MongoDB
    -> Способ шифрования данных: JWT
*/

import express from 'express';
import fs from 'fs';
import multer from 'multer';
import mongoose from 'mongoose'; // Подключение библиотки для работы базы данных
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';


mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('База Данных подключена')
}).catch(()=>{
    console.log("База данных не подключена", err)
});

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
       if (!fs.existsSync('uploads')) {
         fs.mkdirSync('uploads');
       }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage });


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


// =====================================================================================================================================
// ----- Авторизация пользователя -----
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login); 


// ----- Регистрация пользователя -----
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

// ----- Получение информации о пользователе / Авторизован или нет -----
app.get('/auth/me',  checkAuth, UserController.getMe)

// =====================================================================================================================================



app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
      url: `uploads/${req.file.originalname}`,
    });
});



// =====================================================================================================================================
app.get('/tags', PostController.getLastTags); 
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);      // --- Создание статьи
app.get('/posts', PostController.getAll);                                                                // --- Получение всех статей
app.get('/posts/:id', PostController.getOne);                                                            // --- Получение одной статьи
app.delete('/posts/:id', checkAuth, PostController.remove);                                              // --- Удаление статьи
app.get('/posts/tags', PostController.getLastTags);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update); // --- Обновление статьи
// =====================================================================================================================================


app.post('/podpiska', checkAuth, podpiskaCreateValidation, handleValidationErrors, PodpiskaController.create);      // --- Создание подписки





app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Server OK');
});



// Старт: npm run start:dev




































// -----------------------
/*
import express from 'express';

import mongoose from 'mongoose';
mongoose.connect(
    "mongodb+srv://discordbot:qwazm0701@datacluster.ik3tj8s.mongodb.net/?retryWrites=true&w=majority"
).then(()=>{
    console.log('База Данных подключена')
}).catch(()=>{
    console.log("База данных не подключена", err)
});

const app = express();

const User = mongoose.Schema({
    id: String,
    username: {
        type: String,
        default: 'user'
    },
    money: {
        type: Number,
        default: 0,
    },
    time: {
        type: Number,
        default: 0,
    },
    idguild: {
        type: String,
        default: 'Не указали'
    },
});

const MyModel = mongoose.model('DataCluster', User, 'Users');

app.use(express.json());

app.get('/', async (req, res) => {

    // ------- Шифрование данных ------- //
    const token = jwt.sign({
        email: req.body.email,
        fullName: 'Иващенко Евгений Данилович',
    }, 'secret123');
    // ------- Шифрование данных ------- //

    res.send('В консоли есть ответ');
    console.log(token);
});

app.listen(4444, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Server OK');
});

app.get('/', async (req, res) => {
    const User = await MyModel.find({id: "393488444699049985"}); 

    var count = 0;
    var i;
    for (i in User) {
        if (User.hasOwnProperty(i)) {
            count++;
        }
    }

    count = parseInt(`${count}`);
    while(count){
        console.log(User[(count-1)]);
        count--;
    }

    res.send('В консоли есть ответ')
});

app.listen(4444, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Server OK');
}); */