
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUserCase } from './check-in'




let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUserCase

describe('chack-in Use Case', () => {
    beforeEach(()=> {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUserCase (checkInsRepository)
    })
  
  
    it('should be able to chack in', async () => {
        const {checkIn} = await sut.execute({

            gymId: 'gym-a1',
            userId: 'user-01',

        })


 
    
    
        expect(checkIn.id).toEqual(expect.any(String));
    })


})



  