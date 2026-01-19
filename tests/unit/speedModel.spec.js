import { calculateSpeed } from '@/domain/race/speedModel'
import { CONDITION_MAX } from '@/constants/horse'
import {
  BASE_SPEED_MULTIPLIER,
  CONDITION_MIN_FACTOR,
  CONDITION_SPREAD,
} from '@/constants/race'

describe('calculateSpeed', () => {
  test('uses base speed and condition factor correctly', () => {
    const horse = {
      speed: 10,
      condition: CONDITION_MAX,
    }

    const result = calculateSpeed(horse)

    const base = horse.speed * BASE_SPEED_MULTIPLIER
    const factor = CONDITION_MIN_FACTOR + 1 * CONDITION_SPREAD
    const expected = base * factor

    expect(result).toBeCloseTo(expected)
  })

  test('lower condition gives lower speed', () => {
    const good = { speed: 10, condition: CONDITION_MAX }
    const bad = { speed: 10, condition: 1 }

    expect(calculateSpeed(good)).toBeGreaterThan(calculateSpeed(bad))
  })
})
