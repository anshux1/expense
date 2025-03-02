"use server"

import cron from "node-cron"

import { getEndDate, periodNextStartMapping } from "@/lib/utils"
import prisma from "@/db"

async function renewBudget() {
  try {
    const budgets = await prisma.budget.findMany({
      where: {
        isActive: true,
      },
    })
    const now = new Date()
    for (const budget of budgets) {
      if (now >= budget.beginningDate) {
        const newStartDate = periodNextStartMapping[budget.period](now)

        await prisma.budget.create({
          data: {
            userId: budget.userId,
            budgetName: budget.budgetName,
            amount: budget.amount,
            period: budget.period,
            remaining: budget.amount,
            beginningDate: newStartDate,
            isActive: true,
            endDate: getEndDate({
              beginningDate: newStartDate,
              period: budget.period,
            }),
          },
        })
        await prisma.budget.update({
          where: { id: budget.id },
          data: { isActive: false },
        })
      }
    }
    console.log("✅ Budget auto-renewal completed.")
  } catch (error) {
    console.error("❌ Auto-Renew Budgets Error:", error)
  }
}

// ⏰ Run every midnight (00:00) to renew expired budgets
cron.schedule("0 0 * * *", async () => {
  console.log("⏳ Running scheduled budget renewal...")
  await renewBudget()
})
