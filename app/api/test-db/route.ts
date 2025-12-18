import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Test the database connection
    await prisma.$connect()
    
    // Try a simple query to verify it works
    const userCount = await prisma.user.count()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!',
      userCount 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  } finally {
    // Disconnect to avoid keeping connections open
    await prisma.$disconnect()
  }
}

