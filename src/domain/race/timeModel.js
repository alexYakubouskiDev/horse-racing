import { GAME_CONFIG } from '@/constants/game'

export function calculateTime(distance, speed) {
  return (distance / speed) * GAME_CONFIG.TIME_SCALE
}
