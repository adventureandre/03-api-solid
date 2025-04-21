import { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/users/authenticate'
import { register } from './register'
import { profile } from './profile'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
