import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-user-use-case'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { q, page } = searchGymsQuerySchema.parse(request.query)

  const createGymUseCase = makeSearchGymsUseCase()

  await createGymUseCase.execute({
    page,
    query: q,
  })


  return reply.status(201).send()
}
