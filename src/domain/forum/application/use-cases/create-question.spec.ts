import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase


describe('Create Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('create an answer', async () => {

        const { question } = await sut.execute({
            authorId: '1',
            title: 'Question exemple',
            content: 'Conteúdo da pergunta',
        })
        const fistItem = inMemoryQuestionsRepository.items[0]
        expect(fistItem).toBeDefined()
        expect(fistItem!.id).toEqual(question.id)

        expect(inMemoryQuestionsRepository.items[0]!.id).toEqual(question.id)
    })
})
