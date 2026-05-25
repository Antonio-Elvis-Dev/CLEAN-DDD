import { left, right, type Either } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import type { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface EditQuestionUseCaseRequest {
    authorId: string
    questionId: string
    title: string
    content: string
    attachmentsIds: string[]
}
type EditQuestionUseCaseResponse = Either<ResourseNotFoundError | NotAllowedError, {
    question: Question
}>

export class EditQuestionUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private questionAttachmentRepository: QuestionAttachmentsRepository
    ) { }

    async execute({
        authorId,
        questionId,
        title,
        content,
        attachmentsIds                                                                                          
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

        const question = await this.questionsRepository.findById(questionId)

        if (!question) {

            return left(new ResourseNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId(questionId)

        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

        const questionAttachment = attachmentsIds.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                questionId: question.id
            })
        })

        questionAttachmentList.update(questionAttachment)

        question.title = title
        question.content = content
        question.attachments = questionAttachmentList
        await this.questionsRepository.save(question)

        return right({
            question
        })
    }
}
