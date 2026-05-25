import { left, right, type Either } from "@/core/either";
import type { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"; 
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import type { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";

interface EditAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
    attachmentsIds: string[]
}
type EditAnswerUseCaseResponse = Either<NotAllowedError | ResourseNotFoundError, {
    answer: Answer
}>

export class EditAnswerUseCase {
    constructor(
        private answersRepository: AnswersRepository,
        private answerAttachmentRepository: AnswerAttachmentsRepository,
    ) { }

    async execute({
        authorId,
        answerId,
        content,
        attachmentsIds
    }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourseNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError())
        }


        const currentAnswerAttachments = await this.answerAttachmentRepository.findManyByAnswerId(answerId)

        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)

        const answerAttachments = attachmentsIds.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                answerId: answer.id
            })
        })

        answerAttachmentList.update(answerAttachments)

        answer.attachments = answerAttachmentList
        answer.content = content

        await this.answersRepository.save(answer)


        return right({
            answer
        })
    }
}
