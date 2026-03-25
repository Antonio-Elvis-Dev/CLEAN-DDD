import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchRecentQuestionsUseCase

// TODO: pendente 

describe('Fetch Question Answers', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new FetchRecentQuestionsUseCase(inMemoryAnswersRepository)
    })

    it('should be able to fetch paginated recent questions', async () => {

        for(let i =1; i<= 22; i++){

            await inMemoryAnswersRepository.create(makeQuestion())
        }

        const { questions} = await sut.execute({
            page: 2
        })

        expect(questions).toHaveLength(2)

    })

})
