import { User, Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCkeckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const EndOfTheDay = dayjs(date).endOf('date')

    const checkOnSomeDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      const isOnSomeDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(EndOfTheDay)

      return checkIn.user_id === userId && isOnSomeDate
    })

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

    this.items.push(checkIn)

    return checkIn
  }

  async findManybyUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }
}
