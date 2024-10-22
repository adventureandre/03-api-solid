import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCkeckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCkeckInsRepository
let sut: CheckInUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCkeckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gyn-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
