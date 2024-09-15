import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/use-already-exists-error'

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodyschema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodyschema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return replay.status(409).send({
        message: err.message,
      })
    }

    return replay.status(500).send() // TODO: fix me
  }

  return replay.status(201).send()
}
