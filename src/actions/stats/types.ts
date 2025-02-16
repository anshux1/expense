import { z } from "zod"

import { getStatsSchema } from "@/actions/stats/schema"

export type InputTypeGetStats = z.infer<typeof getStatsSchema>
