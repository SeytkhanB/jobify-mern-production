
import express from 'express';
const app = express()
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// db and authenticationUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';         // <-- don't forget to use ".js" extension
import errorHandlerMiddleware from './middleware/error-handler.js'; // <-- don't forget to use ".js" extension
import authenticateUser from './middleware/auth.js'

// cors() <-- helps us to receive data from our origins
// app.use(cors())

// it will make the JSON data available to us in the controllers since we will have post requests.
// we will be looking for stuff, that JSON data will be passed through us using the express

// to log HTTP requests and errors, and simplifies the process
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))


app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/', (req, res) => {
  res.json({msg: 'Welcome!'})
})

app.get('/api/v1', (req, res) => {
  res.json({msg: 'API'})
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (err) {
    console.log(err)
  }
}
start()