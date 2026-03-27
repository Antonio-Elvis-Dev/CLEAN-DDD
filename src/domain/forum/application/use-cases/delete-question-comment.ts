import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string
    questionCommentId: string

}

interface DeleteQuestionCommentUseCaseResponse {
}

export class DeleteQuestionCommentUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private questionCommentRepository: QuestionCommentsRepository
    ) { }

    async execute({
        authorId,
        questionCommentId,

    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {

        const questionComment = await this.questionsRepository.findById(questionCommentId)


        if (!questionComment) {
            throw new Error('Question comment not found.')
        }
        if (questionComment.authorId.toString() !== authorId) {
            throw new Error('Not allowed')
        }

        await this.questionCommentRepository.delete(questionComment)

        return {}
    }

}

