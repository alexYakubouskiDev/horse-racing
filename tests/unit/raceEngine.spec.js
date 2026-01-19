import { runRace } from '@/domain/race/raceEngine'

describe('runRace', () => {
  const horses = [
    { id: 1, name: 'A', speed: 10, condition: 100 },
    { id: 2, name: 'B', speed: 8, condition: 100 },
    { id: 3, name: 'C', speed: 12, condition: 100 },
  ]

  const distance = 100

  test('returns all horses with time and place', () => {
    const result = runRace(horses, distance)

    expect(result).toHaveLength(3)

    result.forEach((horse, index) => {
      expect(horse).toHaveProperty('time')
      expect(horse).toHaveProperty('place', index + 1)
    })
  })

  test('sorts by time ascending (fastest first)', () => {
    const result = runRace(horses, distance)

    const times = result.map((h) => h.time)
    const sorted = [...times].sort((a, b) => a - b)

    expect(times).toEqual(sorted)
  })

  test('does not mutate original horses array', () => {
    const copy = JSON.parse(JSON.stringify(horses))

    runRace(horses, distance)

    expect(horses).toEqual(copy)
  })

  test('places are sequential starting from 1', () => {
    const result = runRace(horses, distance)

    const places = result.map((h) => h.place)
    expect(places).toEqual([1, 2, 3])
  })
})
