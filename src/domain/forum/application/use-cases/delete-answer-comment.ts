import { left, right, type Either } from "@/core/either";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string
    answerCommentId: string

}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>


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
            return left('Answer comment not found.')
        }
        if (answerComment.authorId.toString() !== authorId) {
            return left('Not allowed')
        }

        await this.answerCommentRepository.delete(answerComment)

        return right({})
    }

}

