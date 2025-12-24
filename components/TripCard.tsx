'use client'

import Link from 'next/link'

interface TripCardProps {
    trip: {
        id: string
        name: string
        destination: string
        startDate: Date | string
        endDate: Date | string
        description?: string | null
    }
    onDelete: (id: string) => void
}

export default function TripCard({ trip, onDelete }: TripCardProps) {

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${trip.name}"`)) {
            onDelete(trip.id)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">{trip.name}</h3>
                    <p className="text-gray-600">{trip.destination}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href={`/trips/${trip.id}/edit`}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}