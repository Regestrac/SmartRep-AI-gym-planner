import type { DaySchedule } from '../../helpers/types'
import DayCard from './DayCard'

const PlanDisplay = ({ weeklySchedule }: { weeklySchedule: DaySchedule[] }) => {
  return (
    <div className="space-y-6 mb-8">
      {weeklySchedule.map((schedule, key) => (
        <DayCard key={key} schedule={schedule} />
      ))}
    </div>
  )
}

export default PlanDisplay