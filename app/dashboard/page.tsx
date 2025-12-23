import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import Link from 'next/link'

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
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Welcome, {displayUserName}!
                </h1>
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
                        <div className="grid gap-4">
                            {trips.map((trip) => (
                                <div key={trip.id} className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-xl font-semibold">{trip.name}</h3>
                                    <p className="text-gray-600">{trip.destination}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}