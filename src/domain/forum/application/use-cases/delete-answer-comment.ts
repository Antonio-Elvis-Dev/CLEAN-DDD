import { left, right, type Either } from "@/core/either";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string
    answerCommentId: string

}

type DeleteAnswerCommentUseCaseResponse = Either<ResourseNotFoundError | NotAllowedError, {}>


export class DeleteAnswerCommentUseCase {
    constructor(
        private answerCommentRepository: AnswerCommentsRepository
    ) { }

    async execute({
        authorId,
        answerCommentId,

    }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {

        const answerComment = await this.answerCommentRepository.findById(answerCommentId)


        if (!answerComment) {
            return left(new ResourseNotFoundError())
        }
        if (answerComment.authorId.toString() !== authorId) {
            return left(new NotAllowedError())
        }

        await this.answerCommentRepository.delete(answerComment)

        return right({})
    }

}

