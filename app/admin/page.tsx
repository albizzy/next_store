import { DashboardCard } from "@/components/common/card/dashboardCard"
import db from "@/db/db"

import { formatNumber } from "@/lib/formatters"
import { formatCurrency } from "@/lib/formatters"

const getSalesData = async () => {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true
    })

    return {
        amount: ( data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}

export default async function AdminDashboard() {
    const salesData =  await getSalesData();

    const formattedNumberOfSales = formatNumber(salesData.numberOfSales);
    const formattedAmount = formatCurrency(salesData.amount);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardCard 
                    title="Sales" 
                    subtitle={formattedNumberOfSales} 
                    body={formattedAmount}
                />
            </div>
        </>
    )
}