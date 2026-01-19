import { CONDITION_MAX, CONDITION_MIN } from '@/constants/horse'
import { HORSE_COLORS } from '@/constants/colors'
import { randomInt } from '@/utils/random'

export function createHorses() {
  return HORSE_COLORS.map((color, index) => ({
    id: index + 1,
    color,
    condition: randomInt(CONDITION_MIN, CONDITION_MAX),
  }))
}
