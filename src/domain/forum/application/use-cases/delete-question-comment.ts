import { left, right, type Either } from "@/core/either";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string
    questionCommentId: string

}

type DeleteQuestionCommentUseCaseResponse = Either<NotAllowedError | ResourseNotFoundError, {}>

export class DeleteQuestionCommentUseCase {
    constructor(
        private questionCommentRepository: QuestionCommentsRepository
    ) { }

    async execute({
        authorId,
        questionCommentId,

    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {

        const questionComment = await this.questionCommentRepository.findById(questionCommentId)


        if (!questionComment) {
            return left(new ResourseNotFoundError())
        }
        if (questionComment.authorId.toString() !== authorId) {
            return left(new NotAllowedError())
        }

        await this.questionCommentRepository.delete(questionComment)

        return right({})
    }

}

