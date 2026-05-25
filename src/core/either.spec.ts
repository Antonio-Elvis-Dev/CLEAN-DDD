import { left, right, type Either } from "./either"


function doSommething(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) {
        return right(10)
    } else {

        return left('error')
    }
}

test('success result', () => {
    const result = doSommething(true)


    if (result.isRight()) {
        console.log(result.value)
    }

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
})

test('error result', () => {
    const result = doSommething(false)

    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
})