import { right, type Either } from "@/core/either";
import type { AnswerComment } from "../../enterprise/entities/answer-comment";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import type { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import type { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";


interface FetchAnswerCommentsUseCaseRequest {
    answerId: string
    page: number
}
type FetchAnswerCommentsUseCaseResponse = Either<null, {
    answerComments: AnswerComment[]
}>

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentRepository: AnswerCommentsRepository) { }

    async execute({
        answerId,
        page
    }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page })

        return right({
            answerComments
        })
    }
}
