import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { AnswerProps } from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
    override: Partial<AnswerProps> = {},
    id?: UniqueEntityID
) {}