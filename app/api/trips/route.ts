import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'


export async function POST(request: Request) {
    // authenticate user
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    const userId = (session.user as any).id as string 

    try {
        // get request body
        const body = await request.json()
        const { name, destination, startDate, endDate, description } = body

        // Validate required fields
        if (!name || !destination || !startDate || !endDate) {
            return NextResponse.json(
                { error: 'Missing required fields'},
                { status: 400 }
            )
        }
        
        // Validate dates
        const start = new Date(startDate)
        const end = new Date(endDate)

        if (end < start) {
            return NextResponse.json(
                { error: 'End date must be after start date'},
                { status: 400 }
            )
        }
        
        // create trip
        const trip = await prisma.trip.create({
            data: {
                name,
                destination,
                startDate: start,
                endDate: end,
                description: description || null,
                userId,
            }
        })

        // return response
        return NextResponse.json(
            {
                message: 'Trip created successfully',
                trip: {
                    id: trip.id,
                    name: trip.name,
                    destination: trip.destination,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Trip creation error:', error)
        return NextResponse.json(
            { error: 'Failed to create trip. Please try again.'},
            { status: 500 }
        )
    }
}