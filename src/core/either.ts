// Success
export class Left<L> {

    readonly value: L

    constructor(value: L) {
        this.value = value
    }

}
// Error
export class Right<R> {
    readonly value: R

    constructor(value: R) {
        this.value = value
    }

}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: L): Either<R, L> => {
    return new Left(value)

}

export const right = <L, R>(value: R): Either<R, L> => {
    return new Right(value)

}