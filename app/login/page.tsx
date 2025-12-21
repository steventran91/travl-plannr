'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    // state will go here
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    // handler will go here
    

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
                
                {error && (
                    <div className='bg-red-50 p-3 rounded-md mb-4'>
                        <p className='text-red-700'>{error}</p>
                    </div>
                )}
                
                <form>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                    <p className='mt-4 text-center text-sm text-gray-500'>
                        Don't have an account?{' '}
                        <a href='/register' className='text-indigo-600 hover:text-indigo-700'>
                            Register Here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}