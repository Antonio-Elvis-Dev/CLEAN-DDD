import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { left, right, type Either } from "@/core/either";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";

interface CommentOnQuestionUseCaseRequest {
    authorId: string
    questionId: string
    content: string
}

type CommentOnQuestionUseCaseResponse = Either<
     ResourseNotFoundError, {
        questionComment: QuestionComment
    }>

export class CommentonQuestionUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private questionCommentRepository: QuestionCommentsRepository
    ) { }

    async execute({
        authorId,
        questionId,
        content
    }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {

        const question = await this.questionsRepository.findById(questionId)


        if (!question) {
            return left(new ResourseNotFoundError())
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: new UniqueEntityID(questionId),
            content,
        })

        await this.questionCommentRepository.create(questionComment)

        return right({
            questionComment
        })
    }
}

