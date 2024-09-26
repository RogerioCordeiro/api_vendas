import 'reflect-metadata'
import 'express-async-errors'
import express, { Response, Request } from 'express'
import cors from 'cors'
import { errors } from 'celebrate'
import routes from './routes/index'
import AppError from '@shared/errors/AppError'
import '@shared/typeorm'
import uploadConfig from '@config/upload'
const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(errors())

app.use((error: Error, _: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  console.log(error)
  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000!')
})
