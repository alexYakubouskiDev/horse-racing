import { calculateSpeed } from './speedModel'
import { calculateTime } from './timeModel'

export function runRace(horses, distance) {
  const raceResults = horses.map((horse) => {
    const speed = calculateSpeed(horse)
    const time = calculateTime(distance, speed)

    return {
      ...horse,
      speed,
      time,
    }
  })

  raceResults.sort((a, b) => a.time - b.time)

  return raceResults.map((horse, index) => ({
    ...horse,
    place: index + 1,
  }))
}
