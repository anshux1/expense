import prisma from "../src/db"

export const ExpenseCategories = [
  { value: "💄 Beauty", icon: "💄", name: "Beauty" },
  { value: "💵 Bills", icon: "💵", name: "Bills" },
  { value: "📈 Business", icon: "📈", name: "Business" },
  { value: "🚗 Car", icon: "🚗", name: "Car" },
  { value: "👗 Clothing", icon: "👗", name: "Clothing" },
  { value: "💳 Debt & Loan", icon: "💳", name: "Debt & Loan" },
  { value: "📚 Education", icon: "📚", name: "Education" },
  { value: "🎮 Entertainment", icon: "🎮", name: "Entertainment" },
  { value: "👨 Family", icon: "👨", name: "Family" },
  { value: "🍔 Food & Beverages", icon: "🍔", name: "Food & Beverages" },
  { value: "🎁 Gifts And Donations", icon: "🎁", name: "Gifts And Donations" },
  { value: "💪 Health And Fitness", icon: "💪", name: "Health And Fitness" },
  { value: "🏠 Housing", icon: "🏠", name: "Housing" },
  { value: "🛡️ Insurance", icon: "🛡️", name: "Insurance" },
  { value: "🕶️ Lifestyle", icon: "🕶️", name: "Lifestyle" },
  { value: "🐾 Pet Care", icon: "🐾", name: "Pet Care" },
  { value: "🛍️ Shopping", icon: "🛍️", name: "Shopping" },
  { value: "🚌 Transportation", icon: "🚌", name: "Transportation" },
  { value: "✈️  Travel", icon: "✈️", name: "Travel" },
  { value: "🔌 Utilities", icon: "🔌", name: "Utilities" },
  { value: "🛒 Groceries", icon: "🛒", name: "Groceries" },
  { value: "🍼 Childcare", icon: "🍼", name: "Childcare" },
  { value: "🔔 Subscriptions", icon: "🔔", name: "Subscriptions" },
  { value: "🧴 Personal Care", icon: "🧴", name: "Personal Care" },
  { value: "🍽️ Dining Out", icon: "🍽️", name: "Dining Out" },
]

export const IncomeCategories = [
  { value: "🎓 Allowance", icon: "🎓", name: "Allowance" },
  { value: "🏆 Award", icon: "🏆", name: "Award" },
  { value: "🎉 Bonus", icon: "🎉", name: "Bonus" },
  { value: "💼 Business", icon: "💼", name: "Business" },
  { value: "🤝 Commission", icon: "🤝", name: "Commission" },
  { value: "📈 Dividend", icon: "📈", name: "Dividend" },
  { value: "💰 Cashbacks", icon: "💰", name: "Cashbacks" },
  { value: "💻 Freelance", icon: "💻", name: "Freelance" },
  { value: "🏘️ Rental", icon: "🏘️", name: "Rental" },
  { value: "📊 Capital Gains", icon: "📊", name: "Capital Gains" },
  { value: "💵 Interest", icon: "💵", name: "Interest" },
  { value: "🎲 Lottery", icon: "🎲", name: "Lottery" },
  { value: "🎶 Royality", icon: "🎶", name: "Royality" },
  { value: "💼 Salary", icon: "💼", name: "Salary" },
  { value: "👵 Pension", icon: "👵", name: "Pension" },
  { value: "🛒 Selling", icon: "🛒", name: "Selling" },
  { value: "💡 Tips", icon: "💡", name: "Tips" },
]

async function seedUsers() {
  try {
    await prisma.user.upsert({
      where: { email: "example@gmail.com" },
      update: { email: "example@gmail.com" },
      create: {
        email: "example@gmail.com",
        createdAt: new Date(),
        emailVerified: false,
        updatedAt: new Date(),
        id: "gqnaQDj2B6oXj4NcnLc",
        name: "example",
      },
    })
  } catch (error) {
    console.error("Error seeding users: ", error)
    throw error
  }
}

async function seedCategories() {
  try {
    for (const category of IncomeCategories) {
      await prisma.category.upsert({
        where: {
          name_userId_type: {
            name: category.name,
            type: "income",
            userId: "",
          },
        },
        update: { name: category.name },
        create: {
          name: category.name,
          public: true,
          icon: category.icon,
          userId: "",
          type: "income",
        },
      })
    }
    for (const category of ExpenseCategories) {
      await prisma.category.upsert({
        where: {
          name_userId_type: {
            name: category.name,
            type: "expense",
            userId: "",
          },
        },
        update: { name: category.name },
        create: {
          name: category.name,
          public: true,
          icon: category.icon,
          userId: "",
          type: "expense",
        },
      })
    }
  } catch (error) {
    console.error("Error seeding users: ", error)
    throw error
  }
}

async function seedDatabase() {
  try {
    await seedUsers()
    await seedCategories()
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  } finally {
    prisma.$disconnect()
  }
}

seedDatabase().catch((error) => {
  console.error("An unexpected error occurred during seeding:", error)
  process.exit(1)
})
