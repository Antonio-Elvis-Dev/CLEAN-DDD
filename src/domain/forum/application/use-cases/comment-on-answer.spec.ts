import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachment-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentonAnswerUseCase } from './comment-on-answer';
import { makeAnswer } from 'test/factories/make-answer';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentonAnswerUseCase


describe('Comment on Question', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)

        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
        sut = new CommentonAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository)
    })

    it('should be able to comment on question', async () => {

        const answer = makeAnswer()

        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: 'Test comment'
        })

        expect(inMemoryAnswerCommentsRepository.items[0]?.content).toEqual('Test comment')
    })
})
