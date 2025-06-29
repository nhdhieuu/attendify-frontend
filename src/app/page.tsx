import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TimeTracker } from "@/components/time-tracker"
import { QuickStats } from "@/components/quick-stats"
import { RecentActivity } from "@/components/recent-activity"
import { AttendanceChart } from "@/components/attendance-chart"

export default function DashboardPage() {
  return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TimeTracker />
            </div>
            <div>
              <QuickStats />
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Suspense fallback={<div>Loading chart...</div>}>
              <AttendanceChart />
            </Suspense>
            <RecentActivity />
          </div>
        </main>
      </div>
  )
}
