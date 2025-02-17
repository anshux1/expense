import { z } from "zod"

import { getStatsSchema } from "@/actions/stats/schema"
import { getCategoryStats } from "."

export type InputTypeGetStats = z.infer<typeof getStatsSchema>
export type ReturnTypeCategoryStats = Awaited<
  ReturnType<typeof getCategoryStats>
>
