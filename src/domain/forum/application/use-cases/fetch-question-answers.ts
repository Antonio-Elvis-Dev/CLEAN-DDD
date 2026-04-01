import type { AnswersRepository } from "../repositories/answers-repository";
import type { Answer } from "../../enterprise/entities/answer";


interface FetchQuestionAnswersUseCaseRequest {
    questionId: string
    page: number
}
interface FetchQuestionAnswersUseCaseResponse {
    answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
    constructor(private answerRepository: AnswersRepository) { }

    async execute({
        questionId,
        page
    }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
        const answers = await this.answerRepository.findManyByQuestionId(questionId,{page})

        if (!answers) {
            throw new Error('Question not found.')
        }

        return {
            answers
        }
    }
}
