const express = require('express')
const dotenv = require('dotenv')
const errorHandler = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const cors = require('cors');

//Load env vars
dotenv.config({ path : './config/config.env'})

//connect mongodb
const connectDB = require("./config/db")
connectDB()

//route files
const tasks = require('./routes/task')
const users = require('./routes/user')
const auth = require('./routes/auth')
const rating = require('./routes/rating')

const app = express();

//body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}));
//cookie parser
app.use(cookieParser())


// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/rating', rating);

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT,console.log(`Server listening on ${PORT}` ))