import { Gym, User } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public itens: Gym[] = []

  async findById(id: string) {
    const gym = this.itens.find((iten) => iten.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
