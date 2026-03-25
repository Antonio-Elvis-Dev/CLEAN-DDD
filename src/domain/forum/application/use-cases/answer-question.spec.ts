import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase


describe('Create Answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('shold be able to create an answer', async () => {

    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta',
    })

    const fistItem = inMemoryAnswersRepository.items[0]
    expect(fistItem).toBeDefined()
    expect(fistItem!.id).toEqual(answer.id)

    expect(inMemoryAnswersRepository.items[0]!.id).toEqual(answer.id)
  })
})
