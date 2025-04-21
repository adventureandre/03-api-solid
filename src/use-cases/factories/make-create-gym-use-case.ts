import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const usersRepository = new PrismaGymsRepository()
  const registerUseCase = new CreateGymUseCase(usersRepository)

  return registerUseCase
}
