import { EditQuestionUseCase } from './edit-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase


describe('Edit Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to edit a question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        },


            new UniqueEntityID('question-1')
        )

        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            authorId: 'author-1',
            title: 'exemple question',
            questionId: newQuestion.id.toValue(),
            content: 'question content'
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'exemple question',
            content: 'question content'
        })
    })

    it('should be able to edit a question from another user', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        },


            new UniqueEntityID('question-1')
        )

        await inMemoryQuestionsRepository.create(newQuestion)


        expect(() => {
            return sut.execute({
                authorId: 'author-2',
                title: 'exemple question',
                questionId: newQuestion.id.toValue(),
                content: 'question content'
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
