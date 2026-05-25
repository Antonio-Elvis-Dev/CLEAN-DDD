import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { left, right, type Either } from "@/core/either";
import { ResourseNotFoundError } from "@/core/errors/errors/resourse-not-found-error";

interface FetchRecentQuestionsUseCaseRequest {
    page: number
}
type FetchRecentQuestionsUseCaseResponse = Either<ResourseNotFoundError, {
    questions: Question[]
}>

export class FetchRecentQuestionsUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }

    async execute({
        page
    }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({ page })

        if (!questions) {
            return left(new ResourseNotFoundError())
        }

        return right({
            questions
        })
    }
}
