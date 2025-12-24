'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function NewTripPage() {
    const [name, setName] = useState('')
    const [destination, setDestination] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (new Date(endDate) < new Date(startDate)) {
            setError('End date must be after start date')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    destination,
                    startDate,
                    endDate,
                    description,
                }),
            })
            const data = await response.json()

            if (response.ok) {
                router.push('/dashboard')
            } else {
                setError(data.error || 'Failed to create trip. Please try again.')
                setLoading(false)
            }
        } catch (error) {
            setError('Something went wrong. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="flex justify-end mb-4">
                <Link
                    href="/dashboard"
                    className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
                >
                    ← Back to Dashboard
                </Link>
                </div>
                <h1 className="text-3xl font-bold mb-6">Create New Trip</h1>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 p-3 rounded-md mb-4">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Trip Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="e.g., Viet Nam 2026"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">
                            Destination
                        </label>
                        <input
                            type="text"
                            id="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="e.g., Viet Nam"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            rows={4}
                            placeholder="Add any notes or details about your trip..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Creating Trip...' : 'Create Trip'}
                    </button>
                </form>
            </div>
        </div>
    )
}