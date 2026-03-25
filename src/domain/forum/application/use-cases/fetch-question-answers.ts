import type { AnswersRepository } from "../repositories/answers-repository";
import type { Answer } from "../../enterprise/entities/answer";


interface FetchQuestionAnswerUseCaseRequest {
    questionId: string
    page: number
}
interface FetchQuestionAnswerUseCaseResponse {
    answers: Answer[]
}

export class FetchQuestionAnswerUseCase {
    constructor(private answerRepository: AnswersRepository) { }

    async execute({
        questionId,
        page
    }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
        const answers = await this.answerRepository.findManyQuestionId(questionId,{page})

        if (!answers) {
            throw new Error('Question not found.')
        }

        return {
            answers
        }
    }
}
