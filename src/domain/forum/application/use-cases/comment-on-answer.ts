import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { left, right, type Either } from "@/core/either";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";

interface CommentOnAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

type CommentOnAnswerUseCaseResponse = Either<
     ResourseNotFoundError, {
        answerComment: AnswerComment
    }>

export class CommentonAnswerUseCase {
    constructor(
        private answersRepository: AnswersRepository,
        private answerCommentRepository: AnswerCommentsRepository
    ) { }

    async execute({
        authorId,
        answerId,
        content
    }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId)


        if (!answer) {
            return left(new ResourseNotFoundError())
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content,
        })

        await this.answerCommentRepository.create(answerComment)

        return right({
            answerComment
        })
    }
}

