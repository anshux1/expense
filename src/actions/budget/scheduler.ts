"use server"

import { addDays, addMonths, addWeeks, addYears } from "date-fns"
import cron from "node-cron"

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
        let newStartDate = now
        if (budget.period === "daily") {
          newStartDate = addDays(now, 1)
        } else if (budget.period === "weekly") {
          newStartDate = addWeeks(now, 1)
        } else if (budget.period === "monthly") {
          newStartDate = addMonths(now, 1)
        } else if (budget.period === "yearly") {
          newStartDate = addYears(now, 1)
        }

        await prisma.budget.create({
          data: {
            userId: budget.userId,
            budgetName: budget.budgetName,
            amount: budget.amount,
            period: budget.period,
            remaining: budget.amount,
            beginningDate: newStartDate,
            isActive: true,
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
