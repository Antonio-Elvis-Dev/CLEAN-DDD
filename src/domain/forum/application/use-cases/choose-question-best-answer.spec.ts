import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachment-repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase


describe('Choose Question Best Answer', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository)
    })

    it('should be able to choose the question best answer', async () => {

        const question = makeQuestion()
        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString()
        })

        expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId?.toString()).toEqual(answer.id.toString())
    })

    it('should be able to choose another user question best answer ', async () => {

        const question = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        })
        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)



        const result = await sut.execute({
            answerId: answer.id.toString(),
            authorId: 'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)

    })
})
