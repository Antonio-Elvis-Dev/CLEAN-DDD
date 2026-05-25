import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import type { QuestionsRepository } from "../repositories/questions-repository";
import { left, right, type Either } from "@/core/either";
import { ResourseNotFoundError } from '@/core/errors/errors/resourse-not-found-error';

interface DeleteQuestionUseCaseRequest {
    authorId: string
    questionId: string
}
type DeleteQuestionUseCaseResponse = Either<NotAllowedError | ResourseNotFoundError, {}>
export class DeleteQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }

    async execute({
        authorId,
        questionId
    }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            return left(new ResourseNotFoundError())
        }


        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }



        await this.questionsRepository.delete(question)


        return right({})



    }
}
