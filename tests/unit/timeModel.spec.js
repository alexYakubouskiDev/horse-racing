import { calculateTime } from '@/domain/race/timeModel'
import { GAME_CONFIG } from '@/constants/game'

describe('calculateTime', () => {
  test('time decreases when speed increases', () => {
    const distance = 100

    const slow = calculateTime(distance, 5)
    const fast = calculateTime(distance, 10)

    expect(fast).toBeLessThan(slow)
  })

  test('applies TIME_SCALE correctly', () => {
    const distance = 100
    const speed = 10

    const result = calculateTime(distance, speed)
    const expected = (distance / speed) * GAME_CONFIG.TIME_SCALE

    expect(result).toBe(expected)
  })
})
