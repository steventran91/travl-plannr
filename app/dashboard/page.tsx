import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import TripCard from '@/components/TripCard'
import TripList from '@/components/TripList'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    const displayUserName = session.user?.name || session.user?.email
    const userId = (session.user as any).id as string

    const trips = await prisma.trip.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative flex items-center justify-center mb-6">
                    <h1 className="text-3xl font-bold text-center">
                        Welcome, {displayUserName}!
                    </h1>
                    <div className="absolute right-0">
                        <LogoutButton />
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Your Trips</h2>
                        <Link
                            href="/trips/new"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Create Trip +
                        </Link>
                    </div>
                    {trips.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-500">You don't have any trips yet.</p>
                            <p className="text-gray-400 text-sm mt-2">Create your first trip to get started!</p>
                        </div>
                    ) : (
                        <TripList trips={trips}/>
                    )}
                </div>
            </div>
        </div>
    )
}