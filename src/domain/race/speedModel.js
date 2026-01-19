import { CONDITION_MAX } from '@/constants/horse'
import {
  BASE_SPEED_MULTIPLIER,
  CONDITION_MIN_FACTOR,
  CONDITION_SPREAD,
} from '@/constants/race'

export function calculateSpeed({ speed, condition }) {
  const base = speed * BASE_SPEED_MULTIPLIER
  const factor =
    CONDITION_MIN_FACTOR + (condition / CONDITION_MAX) * CONDITION_SPREAD

  return base * factor
}
