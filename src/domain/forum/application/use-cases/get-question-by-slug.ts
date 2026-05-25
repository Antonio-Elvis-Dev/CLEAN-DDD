import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { left, right, type Either } from "@/core/either";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";

interface GetQuestionBySlugUseCaseRequest {
    slug: string
}
type GetQuestionBySlugUseCaseResponse = Either<ResourseNotFoundError, {
    question: Question
}>

export class GetQuestionBySlugUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }

    async execute({
        slug
}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionsRepository.findBySlug(slug)

        if (!question) {
            return left(new ResourseNotFoundError())
        }

        return right({
            question
        })
    }
}
