import express, { Application, Request, Response } from 'express'
const cors = require('cors');
import { bookRoutes } from './app/controllers/book.controller'
import { borrowBook } from './app/controllers/borrow.controller'
const app: Application = express()

app.use(express.json())
app.use(
  cors({
    origin: ['https://glittery-cheesecake-cf81ab.netlify.app'],
    credentials: true,
  })
);

app.use('/bookApi', bookRoutes)
app.use('/borrowApi' , borrowBook)


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to library management system')
})

export default app;