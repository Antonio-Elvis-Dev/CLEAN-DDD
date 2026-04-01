import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository';
import { CommentonQuestionUseCase } from './comment-on-question';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentonQuestionUseCase


describe('Comment on Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        sut = new CommentonQuestionUseCase(inMemoryQuestionsRepository,inMemoryQuestionCommentsRepository)
    })

    it('should be able to comment on question', async () => {

        const question = makeQuestion()
              
        await inMemoryQuestionsRepository.create(question)

        await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
             content:'Test comment'
        })

        expect(inMemoryQuestionCommentsRepository.items[0]?.content).toEqual('Test comment')
    })
})
