import type { AnswersRepository } from "../repositories/answers-repository";
import type { Answer } from "../../enterprise/entities/answer";
import { left, right, type Either } from "@/core/either";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";


interface FetchQuestionAnswersUseCaseRequest {
    questionId: string
    page: number
}
type FetchQuestionAnswersUseCaseResponse = Either<ResourseNotFoundError, {
    answers: Answer[]
}>

export class FetchQuestionAnswersUseCase {
    constructor(private answerRepository: AnswersRepository) { }

    async execute({
        questionId,
        page
    }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
        const answers = await this.answerRepository.findManyByQuestionId(questionId, { page })

        if (!answers) {
            return left(new ResourseNotFoundError())
        }

        return right({
            answers
        })
    }
}
