import { startOfMonth } from "date-fns"
import { atom } from "jotai"

export const timeRange = atom<{ from: Date; to: Date }>({
  from: startOfMonth(new Date()),
  to: new Date(),
})
