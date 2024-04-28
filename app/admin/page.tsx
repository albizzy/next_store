import { DashboardCard } from "@/components/common/card/dashboardCard"

export default function AdminDashboard() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardCard 
                    title="Sales" 
                    subtitle="Description" 
                    body="text"
                />

                <DashboardCard 
                    title="Sales" 
                    subtitle="Description" 
                    body="text"
                />

                <DashboardCard 
                    title="Sales" 
                    subtitle="Description" 
                    body="text"
                />
            </div>
        </>
    )
}