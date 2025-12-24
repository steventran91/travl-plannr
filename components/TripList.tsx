'use client'

import { useRouter } from 'next/navigation'
import TripCard from './TripCard'

interface Trip{
    id: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    description?: string | null 
}

interface TripListProps {
    trips: Trip[]
}

export default function TripList({ trips }: TripListProps) {
    const router = useRouter()

    const handleDelete = async(tripId: string) => {
        try {
            const response = await fetch(`/api/trips/${tripId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                router.refresh()
            } else {
                alert('Failed to delete trip.')
            }
        } catch (error) {
            console.error('Delete error:', error)
            alert('Something went wrong.')
        }
    }

    return (
        <div>
            {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} onDelete={handleDelete}/>
            ))}
        </div>
    )
}

