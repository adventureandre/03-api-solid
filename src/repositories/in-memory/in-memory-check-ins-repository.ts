import { User, Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCkeckInsRepository implements CheckInsRepository {
  public itens: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkOnSomeDate = this.itens.find(
      (checkIn) => checkIn.user_id === userId,
    )

    if (!checkOnSomeDate) {
      return null
    }

    return checkOnSomeDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.itens.push(checkIn)

    return checkIn
  }
}
