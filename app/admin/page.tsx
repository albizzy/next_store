import { DashboardCard } from "@/components/common/card/dashboardCard"
import db from "@/db/db"

import { formatNumber } from "@/lib/formatters"
import { formatCurrency } from "@/lib/formatters"

const getSalesData = async () => {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true
    })

    await wait(2000);

    return {
        amount: ( data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}

const getUserData = async () => {
    const [ userCount, orderData ] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true },
        })
    ])

    return {
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }
}

const getProductData =  async () => {
    const [ activeCount, inactiveCount ] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true}}),
        db.product.count({ where: { isAvailableForPurchase: false}}),
    ])

    return { activeCount, inactiveCount }
}

function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export default async function AdminDashboard() {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ])

    const formattedNumberOfSales = formatNumber(salesData.numberOfSales);
    const formattedAmount = formatCurrency(salesData.amount);

    const formattedUserCount = formatNumber(userData.userCount);
    const formattedAverageValuePerUser = formatCurrency(userData.averageValuePerUser);

    const formattedActiveCount = formatNumber(productData.activeCount);
    const formattedInactiveCount = formatNumber(productData.inactiveCount);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardCard 
                    title="Sales" 
                    subtitle={`${formattedNumberOfSales} Orders`} 
                    body={formattedAmount}
                />
                <DashboardCard 
                    title="Customers" 
                    subtitle={`${formattedAverageValuePerUser} Average value`} 
                    body={formattedUserCount}
                />
                <DashboardCard 
                    title="Active Products" 
                    subtitle={`${formattedInactiveCount} Inactive`} 
                    body={formattedActiveCount}
                />
            </div>
        </>
    )
}