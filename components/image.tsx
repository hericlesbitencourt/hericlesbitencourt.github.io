"use client"

import NextImage from 'next/image'
import { useState } from 'react'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ src, alt, ...rest }) => {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 w-full h-full">
        <div className="text-gray-400 dark:text-gray-500 text-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      {...rest}
    />
  )
}

export default Image
