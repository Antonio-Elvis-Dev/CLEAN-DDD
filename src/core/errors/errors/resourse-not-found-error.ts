import type { UseCaseError } from '@/core/errors/use-case-error';
export class ResourseNotFoundError extends Error implements UseCaseError {
    constructor() {
        super('Resource not found')
    }
}