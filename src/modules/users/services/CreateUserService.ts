import { getCustomRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'
import UsersRepository from '../typeorm/repositories/UsersRepository'
import User from '../typeorm/entities/User'
import { hashSync } from 'bcryptjs'

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const emailExists = await usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await hashSync(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await usersRepository.save(user)
    return user
  }
}

export default CreateUserService
