import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { left, right, type Either } from "@/core/either";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";

interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerId: string
}
type DeleteAnswerUseCaseResponse = Either<NotAllowedError | ResourseNotFoundError, {
}>

export class DeleteAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) { }

    async execute({
        authorId,
        answerId
    }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourseNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError())
        }

        await this.answersRepository.delete(answer)


        return right({})
    }
}
