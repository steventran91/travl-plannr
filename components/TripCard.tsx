'use client'

import Link from 'next/link'

interface TripCardProps {
    trip: {
        id: string
        name: string
        destination: string
        startDate: Date | string
        endDate: Date |string
        description?: string
    }
    onDelete: (id: string) => void
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
    // edit handler will go here
    // delete handler will go here
    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete "${trip.name}"`)) {
            onDelete(trip.id)
        }
    }

    return (
        // trip card jsx with buttons
    )
}