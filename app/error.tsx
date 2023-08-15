'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col">
            <h2 className="text-lg font-bold">Something went wrong!</h2>
            <p className="pt-2 pb-12 italic">
                {error.message}
            </p>
            <button
                className="self-center px-2 py-1 border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 ease-in-out"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}