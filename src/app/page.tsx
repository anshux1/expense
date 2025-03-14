import Image from "next/image"
import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import {
  ArrowRight,
  ChartColumnStackedIcon,
  PiggyBankIcon,
  Wallet,
} from "lucide-react"

import { historyData, toolsData } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Button } from "@/components/ui/button"
import { OverviewHistoryChart } from "@/components/overview/OverviewHistory"

export default function Home() {
  return (
    <div className="h-auto w-full">
      <div className="sticky top-0 z-50 w-full border-b border-dashed backdrop-blur">
        <div className="mx-auto flex max-w-7xl justify-center border-x border-dashed px-3 sm:px-4 lg:px-6">
          <header className="flex h-16 w-full items-center justify-between">
            <Link className="flex items-center justify-center" href="/">
              <Wallet className="size-6" />
              <span className="ml-2 text-lg font-semibold tracking-wide">
                ExpenseVault
              </span>
            </Link>
          </header>
          <div className="flex items-center gap-2 tracking-wide">
            <Link href="/signin">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center border-x border-dashed">
        <HeroSection />
        <FeatureSection1 />
        <FeatureSection2 />
        <Footer />
      </div>
    </div>
  )
}

const HeroSection = () => {
  return (
    <>
      <h1 className="mt-16 text-center text-3xl font-medium sm:mt-24 sm:text-4xl md:text-5xl">
        Finantial Overview <br /> Management Solution
      </h1>
      <p className="my-6 px-5 text-center text-xs text-muted-foreground sm:w-4/5 md:w-3/5 md:text-sm">
        Your financial hub. Visualize, analyze, strategize easily. Track
        expenses, monitor cash flow, gain insights. Empowering decisions.
        Experience now! Sign up to unlock potential.
      </p>
      <Link href="/signup">
        <Button className="w-fit">
          Get Started today <ArrowRight />
        </Button>
      </Link>
      <div className="mx-5">
        <Image
          src="https://prepmedics.blob.core.windows.net/prepmedics/dashboardimg.png"
          width={1200}
          height={700}
          alt="Hero Image"
          className="mt-14 rounded-lg border bg-secondary-foreground"
        />
      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] -z-20 h-[200%]",
        )}
      />
    </>
  )
}

const features = [
  {
    Icon: PiggyBankIcon,
    name: "Cash Flow Monitoring",
    description: "Monitor your cash flow seamlessly",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-9 size-full scale-90 rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-95">
        <Image
          src="https://prepmedics.blob.core.windows.net/prepmedics/transactionLg.png"
          width={700}
          height={100}
          alt="Hero Image"
          className="hidden lg:block"
        />
        <Image
          src="https://prepmedics.blob.core.windows.net/prepmedics/transactionsSm.png"
          width={700}
          height={100}
          alt="Hero Image"
          className="block lg:invisible lg:absolute lg:hidden"
        />
      </div>
    ),
  },
  {
    Icon: ChartColumnStackedIcon,
    name: "Interactive charts and graphs",
    description:
      "Visualize data dynamically with interactive charts and graphs",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-10 size-full origin-top scale-90 rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-95">
        <OverviewHistoryChart
          height={210}
          data={historyData}
          timeFrame="year"
        />
      </div>
    ),
  },
]

const FeatureSection1 = () => {
  return (
    <div className="relative flex flex-col items-center">
      <h1 className="mt-20 text-center text-3xl font-medium md:text-5xl">
        Mastering Your Finances <br /> with Ease and Precision
      </h1>
      <p className="my-6 px-5 text-center text-xs text-muted-foreground sm:w-4/5 md:w-3/5 md:text-sm">
        Unlock a suite of powerful features designed to simplify your financial
        management. From interactive charts to real-time cash flow monitoring,
        our dashboard has it all.
      </p>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] -z-20 h-[200%]",
        )}
      />
      <BentoGrid className="mt-5 px-5 lg:px-20">
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  )
}

const FeatureSection2 = () => {
  return (
    <>
      <h1 className="mt-20 text-center text-3xl font-medium sm:text-4xl md:text-5xl">
        Streamline Your Financial <br /> Management with Advanced Tools
      </h1>
      <p className="my-6 px-5 text-center text-xs text-muted-foreground sm:w-4/5 md:w-3/5 md:text-sm">
        Experience the ultimate in financial management with our comprehensive
        suite <br /> of features designed to optimize your workflow and ensure
        your financial data is secure.
      </p>
      <div className="mb-10 mt-5 grid w-full grid-cols-1 px-5 md:grid-cols-2 lg:grid-cols-3 xl:px-20">
        {toolsData.map((item) => (
          <div
            key={item.description}
            className={cn(
              "flex flex-col items-center border border-dashed px-2 py-8 transition-all duration-150 hover:bg-secondary",
            )}
          >
            <item.icon className="mb-8 size-10 opacity-80" />
            <h3 className="text-center text-[16px] font-medium">
              {" "}
              {item.heading}
            </h3>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

const Footer = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between border-t border-dashed px-3 sm:px-4 lg:px-6">
      <div className="flex items-center">
        <Wallet className="size-6 text-muted-foreground" />
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          ExpenseVault
        </span>
      </div>
      <div>
        <a href="https://github.com/anshux1/expense">
          {" "}
          <GitHubLogoIcon />
        </a>
      </div>
    </div>
  )
}
