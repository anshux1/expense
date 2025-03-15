# ExpenseVault - Financial Budget Management

ExpenseVault is a web application designed to help users manage their financial budgets efficiently. Users can track their income and expenses, set budgets for different time periods, and gain insights into their spending habits. The platform offers predefined categories for income and expenses, along with the flexibility to create custom categories.

## Tech Stack

- **Frontend**: Next.js 15
- **Authentication**: BetterAuth
- **Database**: PostgreSQL
- **ORM**: Prisma
- **UI Components**: shadcn

## Features

- **User Authentication**: Secure sign-in and sign-up with BetterAuth.
- **Budget Management**: Users can create budgets for daily, weekly, monthly, and yearly periods.
- **Expense Tracking**: Users can add their expenses to budgets to monitor spending.
- **Income & Expense Categories**: Use predefined categories or create custom ones.
- **Insights & Reports**: Get insights on spending habits and budget utilization.

## Getting Started

Follow these instructions to set up and run the project locally.


## Running Locally

> [!NOTE]  
> This project uses [pnpm](https://pnpm.io/) only as a package manager.

1. Clone the repository:

```bash
git clone https://github.com/anshux1/expense.git
```

2. Navigate to the project directory:

```bash
cd expense 
```

> [!NOTE]  
> Your Docker Demon should be online

3. Running Script for Instant setup

```
# Gives permission to execute a setup file
chmod +x setup.sh

# Runs the setup script file
./setup.sh
```

Add Enviroment variables to .env

This will start the development server on [http://localhost:3000](http://localhost:3000).