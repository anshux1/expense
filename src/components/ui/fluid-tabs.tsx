"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

interface TabProps {
  id: string
  label: string
  icon: ReactNode
}

interface AnimatedTabProps {
  activeTab: string
  setActiveTabAction: (tabId: string) => void
  tabs: TabProps[]
}

export default function FluidTabs({
  activeTab,
  setActiveTabAction,
  tabs,
}: AnimatedTabProps) {
  const [touchedTab, setTouchedTab] = useState<string | null>(null)
  const [prevActiveTab, setPrevActiveTab] = useState("investment")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleTabClick = (tabId: string) => {
    setPrevActiveTab(activeTab)
    setActiveTabAction(tabId)
    setTouchedTab(tabId)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setTouchedTab(null)
    }, 300)
  }

  const getTabIndex = (tabId: string) =>
    tabs.findIndex((tab) => tab.id === tabId)

  return (
    <div className="mx-0 flex w-full items-center justify-center md:max-w-lg">
      <div className="relative flex w-full overflow-hidden rounded-xl bg-gray-100 p-1 shadow-sm dark:bg-zinc-900">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeTab}
            className="absolute inset-y-0 my-1 rounded-xl bg-white dark:bg-gray-200"
            initial={{ x: `${getTabIndex(prevActiveTab) * 100}%` }}
            animate={{ x: `${getTabIndex(activeTab) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${98 / tabs.length}%` }}
          />
        </AnimatePresence>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`relative z-10 flex items-center justify-center gap-1.5 p-2 text-center text-sm font-bold transition-colors duration-300 md:px-6 ${
              activeTab === tab.id ? "font-bold text-black" : "text-gray-500"
            } ${touchedTab === tab.id ? "blur-sm" : ""}`}
            onClick={() => handleTabClick(tab.id)}
            style={{ width: `${98 / tabs.length}%` }}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
