import { randomInt, shuffle } from '@/utils/random'

describe('randomInt', () => {
  test('returns number in range inclusive', () => {
    for (let i = 0; i < 100; i++) {
      const value = randomInt(5, 10)
      expect(value).toBeGreaterThanOrEqual(5)
      expect(value).toBeLessThanOrEqual(10)
    }
  })

  test('min equals max returns that value', () => {
    expect(randomInt(7, 7)).toBe(7)
  })
})

describe('shuffle', () => {
  test('returns new array with same elements', () => {
    const source = [1, 2, 3, 4, 5]
    const result = shuffle(source)

    expect(result).not.toBe(source)
    expect(result.sort()).toEqual(source.sort())
  })

  test('does not mutate original array', () => {
    const source = [1, 2, 3, 4, 5]
    const copy = [...source]

    shuffle(source)

    expect(source).toEqual(copy)
  })
})
