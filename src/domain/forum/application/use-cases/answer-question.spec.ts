import { AnswerQuestionUseCase } from './answer-question'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '../../enterprise/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '2',
    content: 'Nova Resposta',
  })
  expect(answer.content).toEqual('Nova Resposta')
})
